const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

// Supported C subset features
const SUPPORTED_FEATURES = {
    dataTypes: ['int', 'char', 'float', 'double'],
    controlStructures: ['if', 'else', 'while', 'for'],
    operators: ['+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>='],
    functions: ['printf', 'scanf', 'main']
};

// Validate C code
function validateCode(code) {
    // Basic syntax validation
    if (!code.includes('main')) {
        throw new Error('Code must contain a main function');
    }

    // Check for unsupported features
    const unsupportedFeatures = [];
    // TODO: Implement more comprehensive validation

    if (unsupportedFeatures.length > 0) {
        throw new Error(`Unsupported features: ${unsupportedFeatures.join(', ')}`);
    }

    return true;
}

// Execute C code
async function executeCode(code) {
    try {
        // Validate code
        validateCode(code);

        // Create temporary file
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const fileName = `temp_${Date.now()}.c`;
        const filePath = path.join(tempDir, fileName);
        const outputPath = path.join(tempDir, `${fileName}.out`);

        // Write code to file
        fs.writeFileSync(filePath, code);

        // Compile and execute
        try {
            // Compile
            await execPromise(`gcc \"${filePath}\" -o \"${outputPath}\"`);
            
            // Execute
            const { stdout, stderr } = await execPromise(`\"${outputPath}\"`);
            
            // Clean up
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputPath);

            return {
                output: stdout,
                error: stderr,
                success: true
            };
        } catch (error) {
            // Clean up on error
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

            return {
                output: '',
                error: error.message,
                success: false
            };
        }
    } catch (error) {
        return {
            output: '',
            error: error.message,
            success: false
        };
    }
}

module.exports = {
    executeCode,
    SUPPORTED_FEATURES
}; 