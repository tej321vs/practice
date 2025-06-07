const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


const MY_API_KEY = process.env.GEMINI_API_KEY;

app.post('/chat', (req, res) => {
  const userApiKey = req.headers['x-api-key'];
  const userMessage = req.body.message;

  if (!userApiKey || userApiKey !== MY_API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key.' });
  }

  const query = userMessage.toLowerCase();
  let reply = 'Sorry, I do not have an answer right now.';
  let image = null;

  if (query.includes('stack')) {
    reply = `A stack is a LIFO (Last In First Out) structure.
It supports push and pop operations.
Used in backtracking, function calls, DFS.
Top is the only accessible point.
Operates in O(1) for push/pop.
Useful in undo features, compiler parsing.
Can be array or linked list based.
Real-life: stack of plates.
Common APIs: push(), pop(), peek().
Efficient for depth-first operations.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lifo_stack.png/300px-Lifo_stack.png';
  } else if (query.includes('queue')) {
    reply = `A queue is FIFO (First In First Out).
Enqueue adds to rear, dequeue removes front.
Used in BFS, CPU scheduling, printers.
O(1) with linked list or circular array.
Variations: circular, priority, deque.
Key operations: enqueue(), dequeue().
Helps async processes, buffers.
Can use linked list or array.
Real-life: waiting line at ticket counter.
Essential in data processing systems.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/300px-Data_Queue.svg.png';
  } else if (query.includes('array')) {
    reply = `Array is a fixed-size indexed data structure.
Allows fast access by index (O(1)).
Used in matrix ops, sorting, caching.
Static in C, dynamic in JS/Python.
Operations: insert, delete, traverse.
Disadvantages: size fixed, shifting costs.
Linear layout in memory.
Used in heap, stacks, queues.
Simple but powerful base structure.
Foundation for advanced data structures.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Array-data-structure.svg/300px-Array-data-structure.svg.png';
  } else if (query.includes('binary search')) {
    reply = `Binary search finds an item in sorted array.
Divides array into halves recursively.
Best case: O(1), Worst: O(log n).
Only works on sorted data.
Mid = (low + high)/2 for index split.
Return index if match; else search half.
Efficient alternative to linear search.
Common in search engines, libraries.
Works on static arrays best.
Key: divide & conquer technique.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Binary_Search_Depiction.svg/300px-Binary_Search_Depiction.svg.png';
  } else if (query.includes('linked list')) {
    reply = `Linked List is a sequence of nodes.
Each node stores data + pointer to next.
Used in dynamic memory allocation.
Types: singly, doubly, circular.
Insertion/deletion O(1) at head.
Traversal O(n) time.
Flexible, no size constraints.
No direct access by index.
Used in stacks, queues, graphs.
Efficient for frequent insertions/deletions.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg';
  } else if (query.includes('tree')) {
    reply = `A tree is a hierarchical structure.
Binary tree: each node ≤ 2 children.
Used in XML parsing, DB indexing.
Traversal: inorder, preorder, postorder.
Binary Search Tree: left < root < right.
Balanced trees (AVL, Red-Black) = O(log n).
Used in heaps, tries, segment trees.
Root node at top; leaves at bottom.
No cycles; recursive structure.
Great for hierarchical data.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_tree.svg';
  } else if (query.includes('graph')) {
    reply = `Graph is a set of nodes + edges.
Types: directed, undirected, weighted.
Used in networks, maps, AI, compilers.
Representations: adj matrix/list.
Traversals: BFS, DFS.
Cycle detection, pathfinding algorithms.
Dijkstra, Floyd, Prim, Kruskal.
Can have loops or be acyclic.
Applications in real-world modeling.
Complex but powerful abstraction.`;
    image = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/6n-graf.svg';
  } else if (query.includes('recursion')) {
    reply = `Recursion is a function calling itself.
Base case ends the recursion.
Used in divide & conquer, DFS, backtracking.
Call stack stores each recursive call.
Elegant but can be memory intensive.
Examples: factorial, Fibonacci, tree traversal.
Tail recursion is optimized in some languages.
Must always ensure base case to avoid overflow.
Ideal for problems with repeated sub-problems.
Powerful technique in algorithm design.`;
  } else if (query.includes('dynamic programming') || query.includes('dp')) {
    reply = `Dynamic Programming solves problems by storing results.
Avoids redundant calculations (memoization/tabulation).
Used when problem has overlapping subproblems.
Examples: Fibonacci, Knapsack, LCS, LIS.
Bottom-up or top-down approaches.
Time complexity greatly improved over recursion.
Requires careful state definition.
DP table used for storing solutions.
Common in optimization problems.
One of the hardest but most useful concepts.`;
  } else if (query.includes('knapsack')) {
    reply = `Knapsack is a DP optimization problem.
Given weights & values, maximize profit in capacity.
0/1 knapsack: item included or not.
Fractional: break items; greedy applicable.
Used in resource allocation, budgeting.
State: dp[i][w] — max value at item i, weight w.
Bottom-up tabulation common.
Classic interview/contest problem.
NP-complete — exponential without DP.
Efficient via dynamic programming.`;
  }

  return res.json({ reply, image });
});

app.listen(3000, () => {
  console.log('✅ DSA Chatbot server running on http://localhost:3000');
});
