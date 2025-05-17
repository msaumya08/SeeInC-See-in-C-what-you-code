import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DSA_QUESTIONS = [
  { id: 'reverse-array', title: 'Reverse an Array', description: 'Reverse an array in place.', code: `void reverse(int arr[], int n) {
    int l = 0, r = n - 1;
    while (l < r) {
        int t = arr[l];
        arr[l] = arr[r];
        arr[r] = t;
        l++;
        r--;
    }
}`, explanation: 'This function swaps elements from both ends of the array moving towards the center.', input: 'arr = [1,2,3,4,5]', output: 'arr = [5,4,3,2,1]' },
  { id: 'find-max', title: 'Find Maximum Element', description: 'Find the maximum element in an array.', code: `int max(int arr[], int n) {
    int m = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > m) m = arr[i];
    }
    return m;
}`, explanation: 'Iterates through the array and keeps track of the largest value found.', input: 'arr = [3,7,2,9,4]', output: '9' },
  { id: 'palindrome-string', title: 'Check Palindrome String', description: 'Check if a string is a palindrome.', code: `int isPal(char s[]) {
    int l = 0, r = strlen(s) - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return 0;
    }
    return 1;
}`, explanation: 'Compares characters from both ends of the string moving towards the center.', input: 's = "madam"', output: '1 (true)' },
  { id: 'binary-search', title: 'Binary Search', description: 'Binary search in a sorted array.', code: `int bs(int arr[], int n, int k) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == k) return m;
        if (arr[m] < k) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`, explanation: 'Divides the array in half each time to efficiently find the target value.', input: 'arr = [1,3,5,7,9], k = 5', output: '2 (index)' },
  { id: 'fibonacci', title: 'Fibonacci (Recursion)', description: 'Print nth Fibonacci number.', code: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`, explanation: 'Recursively computes the nth Fibonacci number.', input: 'n = 5', output: '5' },
  { id: 'bubble-sort', title: 'Bubble Sort', description: 'Sort an array using bubble sort.', code: `void bubble(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
}` },
  { id: 'selection-sort', title: 'Selection Sort', description: 'Sort an array using selection sort.', code: `void sel(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[m]) m = j;
        }
        int t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
}` },
  { id: 'insertion-sort', title: 'Insertion Sort', description: 'Sort an array using insertion sort.', code: `void ins(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int k = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > k) arr[j + 1] = arr[j--];
        arr[j + 1] = k;
    }
}` },
  { id: 'stack-array', title: 'Stack Using Array', description: 'Implement stack using array.', code: `#define N 100
int st[N], top = -1;
void push(int x) {
    if (top < N - 1) st[++top] = x;
}
int pop() {
    if (top >= 0) return st[top--];
    return -1;
}` },
  { id: 'queue-array', title: 'Queue Using Array', description: 'Implement queue using array.', code: `#define N 100
int q[N], f = 0, r = 0;
void enq(int x) {
    if (r < N) q[r++] = x;
}
int deq() {
    if (f < r) return q[f++];
    return -1;
}` },
  { id: 'linked-list-insert', title: 'Linked List Insert', description: 'Insert node in singly linked list.', code: `struct Node {
    int d;
    struct Node* n;
};
struct Node* ins(struct Node* h, int v) {
    struct Node* t = malloc(sizeof(struct Node));
    t->d = v;
    t->n = h;
    return t;
}` },
  { id: 'detect-cycle', title: 'Detect Cycle in Linked List', description: 'Detect cycle in a linked list.', code: `int hasCycle(struct Node* h) {
    struct Node *s = h, *f = h;
    while (f && f->n) {
        s = s->n;
        f = f->n->n;
        if (s == f) return 1;
    }
    return 0;
}` },
  { id: 'dfs-graph', title: 'DFS in Graph', description: 'Depth First Search in graph.', code: `void dfs(int u, int vis[], int adj[][N], int n) {
    vis[u] = 1;
    for (int v = 0; v < n; v++)
        if (adj[u][v] && !vis[v]) dfs(v, vis, adj, n);
}` },
  { id: 'bfs-graph', title: 'BFS in Graph', description: 'Breadth First Search in graph.', code: `void bfs(int s, int vis[], int adj[][N], int n) {
    int q[N], f = 0, r = 0;
    q[r++] = s;
    vis[s] = 1;
    while (f < r) {
        int u = q[f++];
        for (int v = 0; v < n; v++)
            if (adj[u][v] && !vis[v]) {
                q[r++] = v;
                vis[v] = 1;
            }
    }
}` },
  { id: 'gcd', title: 'Find GCD', description: 'Find GCD of two numbers.', code: `int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}` },
  { id: 'lcm', title: 'Find LCM', description: 'Find LCM of two numbers.', code: `int lcm(int a, int b) {
    return a / gcd(a, b) * b;
}` },
  { id: 'is-prime', title: 'Check Prime', description: 'Check if a number is prime.', code: `int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}` },
  { id: 'matrix-mul', title: 'Matrix Multiplication', description: 'Multiply two matrices.', code: `void mul(int a[][N], int b[][N], int c[][N], int n) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            c[i][j] = 0;
            for (int k = 0; k < n; k++)
                c[i][j] += a[i][k] * b[k][j];
        }
}` },
  { id: 'factorial', title: 'Find Factorial', description: 'Find factorial of a number.', code: `int fact(int n) {
    return n <= 1 ? 1 : n * fact(n - 1);
}` },
  { id: 'merge-sorted', title: 'Merge Two Sorted Arrays', description: 'Merge two sorted arrays.', code: `void merge(int a[], int n, int b[], int m, int c[]) {
    int i = 0, j = 0, k = 0;
    while (i < n && j < m)
        c[k++] = a[i] < b[j] ? a[i++] : b[j++];
    while (i < n) c[k++] = a[i++];
    while (j < m) c[k++] = b[j++];
}` }
];

const DSAPractice = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = DSA_QUESTIONS.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>DSA Practice (with C)</Typography>
      <TextField
        fullWidth
        label="Search questions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filtered.map((q, idx) => (
          <Grid item xs={12} md={6} key={q.id}>
            <Paper sx={{ p: 2, cursor: 'pointer' }} onClick={() => navigate(`/dsa-practice/${q.id}`)}>
              <Typography variant="h6" gutterBottom>{q.title}</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>{q.description}</Typography>
              <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>
                <pre style={{ margin: 0 }}>{q.code}</pre>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DSAPractice; 