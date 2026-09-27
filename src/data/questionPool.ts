import { Question } from '../types/quiz';

export const CATEGORIES = [
  {
    id: 'ALL' as const,
    name: 'All Topics (Full Spectrum)',
    shortName: 'Mixed',
    description: 'Comprehensive test across Computer Science, AI, Networks, and Systems',
    icon: 'Layers',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/40',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    id: 'AI_ML' as const,
    name: 'Artificial Intelligence & ML',
    shortName: 'AI & ML',
    description: 'Neural networks, LLMs, reinforcement learning, training dynamics & optimization',
    icon: 'Sparkles',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/40',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  {
    id: 'CS_FUND' as const,
    name: 'CS Fundamentals & Data Structures',
    shortName: 'CS Fundamentals',
    description: 'Algorithms, memory architecture, Big-O complexity, trees, heaps & compilers',
    icon: 'Binary',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'NET_HARD' as const,
    name: 'Networks, Hardware & Cyber Security',
    shortName: 'Networks & Security',
    description: 'OSI layers, TCP/UDP, cryptographic protocols, CPU architecture & threat models',
    icon: 'ShieldCheck',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/40',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  {
    id: 'CLOUD_WEB' as const,
    name: 'Cloud, Distributed Systems & Modern Web',
    shortName: 'Cloud & Systems',
    description: 'Microservices, REST/GraphQL, containerization, caching, and database design',
    icon: 'Cloud',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  }
];

export const QUESTION_POOL: Question[] = [
  // CS FUNDAMENTALS & ALGORITHMS
  {
    id: 'CS_1',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'Which component of a computer system executes instructions and manages data processing?',
    options: ['Random Access Memory (RAM)', 'Central Processing Unit (CPU)', 'Hard Disk Drive (HDD)', 'Graphics Processing Unit (GPU)'],
    answer: 1,
    explanation: 'The Central Processing Unit (CPU) is the core processor that executes arithmetic, logic, and control instructions retrieved from memory.'
  },
  {
    id: 'CS_2',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'Which data structure follows the First-In, First-Out (FIFO) operational principle?',
    options: ['Stack', 'Binary Tree', 'Queue', 'Hash Table'],
    answer: 2,
    explanation: 'A Queue enforces FIFO (First-In, First-Out) ordering, where elements are inserted at the back and removed from the front.'
  },
  {
    id: 'CS_3',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'What is the primary function of an Operating System (OS)?',
    options: ['To compile source code into binary machine code', 'To manage hardware resources and mediate software execution', 'To host relational database engines', 'To filter network packets at hardware level'],
    answer: 1,
    explanation: 'An Operating System acts as an intermediary between computer hardware and user applications, managing memory, CPU time, files, and peripherals.'
  },
  {
    id: 'CS_4',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Intermediate',
    question: 'What is the worst-case Time Complexity of the standard QuickSort algorithm with naive pivot selection?',
    options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'],
    answer: 2,
    explanation: 'QuickSort exhibits O(N²) worst-case complexity when the selected pivot repeatedly partitions the array into highly unbalanced subarrays of sizes 0 and N-1 (e.g. already sorted array with extreme pivot).'
  },
  {
    id: 'CS_5',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'What is the binary representation of the decimal number 10?',
    options: ['1000', '1010', '1100', '1110'],
    answer: 1,
    explanation: '10 in decimal = (1 × 8) + (0 × 4) + (1 × 2) + (0 × 1), which gives 1010 in base-2 binary.'
  },
  {
    id: 'CS_6',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'Which data structure operates on a Last-In, First-Out (LIFO) access order?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    answer: 1,
    explanation: 'A Stack relies on LIFO access order, where the most recently pushed element is the first one popped.'
  },
  {
    id: 'CS_7',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Intermediate',
    question: 'What is the average time complexity for searching an element in a well-distributed Hash Table?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'],
    answer: 0,
    explanation: 'With a uniform hash distribution and reasonable load factor, average search, insert, and delete in a hash table are O(1) constant time.'
  },
  {
    id: 'CS_8',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Intermediate',
    question: 'In object-oriented programming, which principle allows a derived subclass to provide a specific implementation of a method already declared in its base class?',
    options: ['Encapsulation', 'Polymorphism (Method Overriding)', 'Data Abstraction', 'Structural Subtyping'],
    answer: 1,
    explanation: 'Polymorphism (specifically runtime polymorphism via method overriding) allows child classes to redefine base class methods with specialized behavior.'
  },
  {
    id: 'CS_9',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'Which volatile memory directly stores code and data currently being processed by the CPU?',
    options: ['ROM', 'RAM', 'NVMe SSD', 'Optical Drive'],
    answer: 1,
    explanation: 'RAM (Random Access Memory) is fast, volatile primary memory that temporarily holds active program instructions and variables while the device is powered.'
  },
  {
    id: 'CS_10',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Beginner',
    question: 'What is the core distinction of an Ahead-Of-Time (AOT) Compiler compared to a pure Interpreter?',
    options: ['Translates entire high-level source code into target machine code prior to execution', 'Executes code line-by-line in real time', 'Manages runtime garbage collection only', 'Transfers files across network sockets'],
    answer: 0,
    explanation: 'Compilers translate the entire source program into machine code or bytecode ahead of time, whereas interpreters execute statements dynamically line by line.'
  },
  {
    id: 'CS_11',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Intermediate',
    question: 'Which sorting algorithm is guaranteed to have O(N log N) time complexity in worst, average, and best cases?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    answer: 2,
    explanation: 'Merge Sort uses a divide-and-conquer strategy that consistently splits arrays in half (log N levels) and merges them in linear time O(N), guaranteeing O(N log N) in all scenarios.'
  },
  {
    id: 'CS_12',
    category: 'CS_FUND',
    categoryLabel: 'CS Fundamentals',
    difficulty: 'Advanced',
    question: 'In graph theory, which algorithm is optimal for finding the shortest path in a weighted graph with non-negative edge weights?',
    options: ["Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Kruskal's Algorithm", "Depth-First Search (DFS)"],
    answer: 0,
    explanation: "Dijkstra's algorithm uses a priority queue to greedily compute single-source shortest paths on graphs with strictly non-negative edge weights in O((V + E) log V) time."
  },

  // ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  {
    id: 'AI_1',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Beginner',
    question: 'What does the acronym "AI" stand for in modern computing?',
    options: ['Automated Information', 'Artificial Intelligence', 'Advanced Integration', 'Algorithmic Iteration'],
    answer: 1,
    explanation: 'AI stands for Artificial Intelligence—the simulation of human intelligence processes by machines and computer algorithms.'
  },
  {
    id: 'AI_2',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Beginner',
    question: 'Which subfield of AI focuses on multi-layered artificial neural networks capable of learning hierarchical feature representations?',
    options: ['Deep Learning', 'Symbolic Logic', 'Relational Databases', 'Discrete Mathematics'],
    answer: 0,
    explanation: 'Deep Learning utilizes deep neural architectures with multiple hidden layers to automatically extract high-level abstract representations from raw input.'
  },
  {
    id: 'AI_3',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Beginner',
    question: 'What famous 1950 benchmark was proposed by Alan Turing to test whether a machine exhibits human-indistinguishable conversation?',
    options: ['Turing Test', 'Voight-Kampff Test', 'Winograd Schema', 'Markov Decision Boundary'],
    answer: 0,
    explanation: 'The Turing Test assesses whether an AI conversational agent can converse convincingly enough that human evaluators cannot reliably distinguish it from a human.'
  },
  {
    id: 'AI_4',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Beginner',
    question: 'What category describes AI systems specialized to excel at a single focused task (such as facial recognition or chess)?',
    options: ['Artificial General Intelligence (AGI)', 'Narrow AI (Weak AI)', 'Superintelligence', 'Universal Autonomous Agent'],
    answer: 1,
    explanation: 'Narrow AI (or Weak AI) is designed and trained specifically for a defined domain task, in contrast to Artificial General Intelligence (AGI).'
  },
  {
    id: 'AI_5',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Beginner',
    question: 'Which programming language is predominantly used across modern machine learning frameworks such as PyTorch and TensorFlow?',
    options: ['C++', 'Rust', 'Python', 'Perl'],
    answer: 2,
    explanation: 'Python is the de facto language in AI/ML due to its rich ecosystem of libraries (PyTorch, TensorFlow, Scikit-learn, NumPy) and rapid prototyping capabilities.'
  },
  {
    id: 'AI_6',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'Which of the following is a classic example of an Unsupervised Machine Learning algorithm?',
    options: ['Linear Regression', 'K-Means Clustering', 'Supervised Decision Trees', 'Logistic Classification'],
    answer: 1,
    explanation: 'K-Means Clustering groups unlabeled data points into K distinct clusters based on feature similarity without requiring explicit ground-truth labels.'
  },
  {
    id: 'AI_7',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'In deep neural networks, what mathematical function introduces non-linearity, allowing networks to learn complex decision boundaries?',
    options: ['Loss Function', 'Activation Function (e.g. ReLU, GELU)', 'Gradient Descent Optimizer', 'Batch Normalizer'],
    answer: 1,
    explanation: 'Activation functions (like ReLU, GELU, Sigmoid) apply non-linear transformations to linear combinations of inputs, enabling neural networks to approximate universal non-linear functions.'
  },
  {
    id: 'AI_8',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'Which seminal neural network architecture, introduced in "Attention Is All You Need" (2017), forms the backbone of modern Large Language Models?',
    options: ['Convolutional Neural Network (CNN)', 'Recurrent Neural Network (RNN)', 'Transformer Architecture', 'Self-Organizing Map (SOM)'],
    answer: 2,
    explanation: 'The Transformer architecture introduced the Multi-Head Self-Attention mechanism, replacing recurrent recurrence with parallelized attention and scaling capabilities.'
  },
  {
    id: 'AI_9',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'What technique involves leveraging a large pre-trained foundation model and adapting it to a specialized downstream task?',
    options: ['Transfer Learning', 'Catastrophic Forgetting', 'Dropout Regularization', 'Feature Hashing'],
    answer: 0,
    explanation: 'Transfer Learning transfers representations and learned weights from a large model trained on vast corpora to a specific target domain with fine-tuning.'
  },
  {
    id: 'AI_10',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'What phenomenon occurs when a machine learning model fits training data too rigidly, memorizing noise and performing poorly on unseen test data?',
    options: ['Underfitting', 'Overfitting', 'High Bias', 'Model Calibration'],
    answer: 1,
    explanation: 'Overfitting occurs when a high-capacity model learns idiosyncratic noise and random fluctuations in the training set rather than the underlying generalizable patterns.'
  },
  {
    id: 'AI_11',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    question: 'Which learning paradigm trains an autonomous agent by rewarding positive behaviors and penalizing undesirable states?',
    options: ['Supervised Learning', 'Reinforcement Learning', 'Unsupervised Clustering', 'Deductive Reasoning'],
    answer: 1,
    explanation: 'Reinforcement Learning (RL) models an agent navigating a Markov Decision Process (MDP) by discovering policies that maximize cumulative rewards.'
  },
  {
    id: 'AI_12',
    category: 'AI_ML',
    categoryLabel: 'AI & Machine Learning',
    difficulty: 'Advanced',
    question: 'In modern generative AI evaluation, what does "Hallucination" specifically refer to?',
    options: ['Memory exhaustion during GPU inference', 'The model generating syntactically confident statements that are factually inaccurate or unsubstantiated', 'Low token generation speeds due to network latency', 'Gradient vanishing during backward pass'],
    answer: 1,
    explanation: 'LLM hallucination describes when a language model generates fluent, grammatically sound outputs that are factually wrong, fabricated, or unsupported by reference context.'
  },

  // NETWORKS, HARDWARE & CYBER SECURITY
  {
    id: 'NET_1',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'In web communication, what does the protocol acronym "HTTP" stand for?',
    options: ['HyperText Transfer Protocol', 'High-Tech Transport Program', 'Hyperlink Technical Transit', 'Host Terminal Transfer Protocol'],
    answer: 0,
    explanation: 'HTTP stands for HyperText Transfer Protocol, the fundamental application layer protocol used for transmitting hypermedia documents across the World Wide Web.'
  },
  {
    id: 'NET_2',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'Which universal connector standard delivers high-speed data transfer, video output, and bidirectional power delivery across modern hardware?',
    options: ['VGA', 'USB Type-C', 'PS/2 Port', 'Serial RS-232'],
    answer: 1,
    explanation: 'USB Type-C is a reversible 24-pin interconnect standard supporting protocols such as USB4, Thunderbolt 4, DisplayPort Alt Mode, and Power Delivery up to 240W.'
  },
  {
    id: 'NET_3',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'What classification of malware encrypts victim storage volumes and demands monetary payment in exchange for decryption keys?',
    options: ['Spyware', 'Ransomware', 'Adware', 'Macro Trojan'],
    answer: 1,
    explanation: 'Ransomware maliciously encrypts files, systems, or databases, locking out legitimate users until an extortion payment or ransom is fulfilled.'
  },
  {
    id: 'NET_4',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Intermediate',
    question: 'At which layer of the standard 7-layer OSI Model does an IP Router primarily make forwarding decisions?',
    options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network Layer)', 'Layer 4 (Transport Layer)'],
    answer: 2,
    explanation: 'Routers operate at Layer 3 (Network Layer) of the OSI model, inspecting destination IP addresses in packet headers to route traffic across disparate networks.'
  },
  {
    id: 'NET_5',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'Which network protocol automatically assigns IP addresses, subnet masks, and default gateways to client devices on a local area network?',
    options: ['DNS', 'DHCP', 'FTP', 'SNMP'],
    answer: 1,
    explanation: 'Dynamic Host Configuration Protocol (DHCP) automatically provisions network configuration parameters to client devices upon connection.'
  },
  {
    id: 'NET_6',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'What decentralized service functions as the "phonebook" of the Internet, translating domain names (e.g. google.com) into numerical IP addresses?',
    options: ['Domain Name System (DNS)', 'Address Resolution Protocol (ARP)', 'Border Gateway Protocol (BGP)', 'Network Address Translation (NAT)'],
    answer: 0,
    explanation: 'The Domain Name System (DNS) maps human-readable domain names to machine-routable IPv4 and IPv6 addresses.'
  },
  {
    id: 'NET_7',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'What is the primary role of a Firewall in enterprise cyber defense?',
    options: ['To boost broadband speeds through compression', 'To inspect, filter, and block unauthorized network packets according to defined security rules', 'To defragment hard disk sectors', 'To render CSS web styling'],
    answer: 1,
    explanation: 'A Firewall inspects inbound and outbound network traffic based on predefined security access rules, establishing a protective barrier between trusted and untrusted networks.'
  },
  {
    id: 'NET_8',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Intermediate',
    question: 'Which network physical topology connects every client station directly to a central networking device (switch or hub)?',
    options: ['Ring Topology', 'Star Topology', 'Bus Topology', 'Mesh Topology'],
    answer: 1,
    explanation: 'In a Star Topology, all peripheral network devices connect point-to-point to a central hub or switch. If one cable fails, only that device is disconnected.'
  },
  {
    id: 'NET_9',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'What cyber attack vector uses deceptive electronic messages impersonating trustworthy entities to trick users into disclosing passwords or credentials?',
    options: ['DDoS Amplification', 'Phishing', 'Man-in-the-Middle', 'Buffer Overflow'],
    answer: 1,
    explanation: 'Phishing is a social engineering attack that masquerades as legitimate communications (emails, SMS, fake login portals) to steal authentication credentials.'
  },
  {
    id: 'NET_10',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Beginner',
    question: 'Which non-volatile storage technology utilizes NAND flash memory chips instead of spinning magnetic platters for superior I/O throughput?',
    options: ['Solid State Drive (SSD)', 'Compact Disc (CD-ROM)', 'Hard Disk Drive (HDD)', 'Magnetic Tape Streamer'],
    answer: 0,
    explanation: 'Solid State Drives (SSDs) use flash memory without moving parts, delivering sub-millisecond access latency and significantly higher read/write throughput.'
  },
  {
    id: 'NET_11',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Intermediate',
    question: 'What is the default TCP port number designated for TLS-encrypted HTTPS web communication?',
    options: ['80', '22', '443', '8080'],
    answer: 2,
    explanation: 'Port 443 is the standard IANA port assigned for HTTPS (HTTP over TLS), whereas port 80 is used for unencrypted plain HTTP.'
  },
  {
    id: 'NET_12',
    category: 'NET_HARD',
    categoryLabel: 'Networks & Security',
    difficulty: 'Intermediate',
    question: 'What is a MAC (Media Access Control) address?',
    options: ['A temporary session token assigned by web servers', 'A permanent, globally unique physical hardware identifier burned into a Network Interface Card (NIC)', 'The regional geolocation coordinates of a data center', 'An asymmetric public cryptographic key'],
    answer: 1,
    explanation: 'A MAC address is a 48-bit hardware identifier burned into a device Network Interface Controller (NIC), operating at Layer 2 (Data Link) for local frame delivery.'
  },

  // CLOUD, DISTRIBUTED SYSTEMS & MODERN WEB
  {
    id: 'CLOUD_1',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Intermediate',
    question: 'In distributed computing and database architecture, what does the CAP theorem assert?',
    options: [
      'A system can simultaneously guarantee Consistency, Availability, and Partition Tolerance at all times',
      'A distributed data store can provide at most two of the three guarantees: Consistency, Availability, and Partition tolerance',
      'Cloud compute capacity scales inversely with network bandwidth',
      'CPU clock speed doubles every eighteen months'
    ],
    answer: 1,
    explanation: 'Brewer’s CAP theorem proves that in the presence of an unavoidable network partition (P), a distributed system must choose between Consistency (C) or Availability (A).'
  },
  {
    id: 'CLOUD_2',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Beginner',
    question: 'What is the primary role of a Content Delivery Network (CDN) like Cloudflare or Fastly?',
    options: [
      'To compile backend TypeScript code',
      'To cache static assets at edge servers geographically close to users to reduce latency',
      'To replace relational database schemas',
      'To manage local Wi-Fi router firmware'
    ],
    answer: 1,
    explanation: 'A CDN distributes static and dynamic web content across geographically dispersed edge PoPs, reducing latency and time-to-first-byte (TTFB) for users worldwide.'
  },
  {
    id: 'CLOUD_3',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Intermediate',
    question: 'Which containerization technology packages applications and their runtime dependencies into portable, isolated execution images?',
    options: ['Docker', 'Nginx', 'Apache Spark', 'Memcached'],
    answer: 0,
    explanation: 'Docker packages application code, libraries, and runtime environment into lightweight containers sharing the host OS kernel for seamless cross-environment portability.'
  },
  {
    id: 'CLOUD_4',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Intermediate',
    question: 'In RESTful API design, which HTTP method is defined as idempotent and specifically intended to update or replace an existing resource?',
    options: ['POST', 'PUT', 'CONNECT', 'OPTIONS'],
    answer: 1,
    explanation: 'HTTP PUT is idempotent; making multiple identical PUT requests with the same payload results in the exact same resource state as making one request.'
  },
  {
    id: 'CLOUD_5',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Intermediate',
    question: 'What is the primary function of an in-memory key-value cache such as Redis in high-throughput web applications?',
    options: [
      'To replace CSS rendering engines in web browsers',
      'To temporarily store frequently accessed data in RAM to prevent database query bottlenecks',
      'To act as a physical layer firewall',
      'To execute GPU matrix tensor multiplications'
    ],
    answer: 1,
    explanation: 'Redis operates in RAM to provide sub-millisecond read/write speeds, caching hot database queries and session tokens to protect relational databases from overload.'
  },
  {
    id: 'CLOUD_6',
    category: 'CLOUD_WEB',
    categoryLabel: 'Cloud & Systems',
    difficulty: 'Intermediate',
    question: 'What does horizontal scaling (scaling out) mean in cloud infrastructure architecture?',
    options: [
      'Adding more RAM or upgrading the CPU cores of an existing single server machine',
      'Provisioning additional server instances to distribute incoming workload across multiple nodes',
      'Decreasing database storage capacity during night hours',
      'Switching from IPv4 addressing to IPv6 addressing'
    ],
    answer: 1,
    explanation: 'Scaling out (horizontal scaling) adds more independent machines or container instances behind a load balancer, providing elastic resilience compared to scaling up (vertical scaling).'
  }
];
