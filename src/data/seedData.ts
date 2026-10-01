import { BlogPost, Experience, Project, SkillCategory, SiteSettings } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  name: 'Julian Thorne',
  role: 'Software Engineer',
  headline: 'Building reliable software, exploring intelligent systems, and solving meaningful problems.',
  subheadline: 'Computer science graduate focused on distributed systems, backend architectures, and high-throughput developer tooling.',
  bioShort: 'Software engineer with an obsession for systems reliability, clean API design, and predictable latency. I enjoy peeling back abstractions to understand how software behaves at the metal.',
  bioFull: [
    'I am a software engineer and computer science graduate who spends most of my time designing backend services, optimizing data access layers, and investigating distributed consensus protocols.',
    'My journey in computing started with building simple automation scripts, but quickly evolved into an fascination with systems engineering: memory hierarchies, concurrency invariants, and what happens when networks partition.',
    'I believe great engineering is characterized by simplicity over cleverness, clear failure modes, and respect for mechanical sympathy. When I am not writing code, I read papers on distributed storage, write technical essays, or experiment with systems programming languages.'
  ],
  currentlyBuilding: 'High-throughput async event ingestion pipeline with zero-copy deserialization',
  currentlyLearning: 'Formal verification (TLA+) and lock-free concurrency primitives',
  currentlyExploring: 'Vector indexing algorithms (HNSW vs. ScaNN) and custom memory allocators',
  email: 'julian.thorne.dev@gmail.com',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  xUrl: 'https://x.com',
  resumeUrl: '#',
  location: 'San Francisco, CA / Remote',
  seoTitle: 'Julian Thorne — Software Engineer & Systems Builder',
  seoDescription: 'Personal portfolio, technical publication, distributed systems engineering, and project showcase.',
  statusTicker: 'Currently building · Learning · Experimenting'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'ProjectLens',
    slug: 'projectlens',
    description: 'Predictive microservices latency monitor and anomaly forecasting engine with zero-overhead telemetry.',
    problemSolved: 'Microservice architectures suffer from silent cascading latency spikes. ProjectLens applies exponential smoothing and Bayesian change-point detection on distributed trace samples to identify bottleneck services before P99 degradation cascades.',
    architectureHighlights: [
      'Asynchronous ingestion pipeline handling 45,000 trace spans/sec with sub-millisecond local buffering.',
      'Custom sliding-window percentile aggregator implemented with t-digest quantile estimation.',
      'PostgreSQL time-partitioned tables with automated vacuum schedule and materialized rollups.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'TimescaleDB'],
    githubUrl: 'https://github.com/example/projectlens',
    liveUrl: 'https://projectlens.dev',
    featured: true,
    status: 'Featured',
    year: '2026',
    category: 'Backend & Systems',
    order: 1
  },
  {
    id: 'proj-2',
    name: 'RaftKV-Engine',
    slug: 'raftkv-engine',
    description: 'Distributed, fault-tolerant key-value store implementing the Raft consensus protocol from scratch.',
    problemSolved: 'Built to understand linearizable consistency guarantees, log compaction, and leader election edge cases under harsh network partition simulations and node failure scenarios.',
    architectureHighlights: [
      'Complete Raft state machine supporting Log Replication, Leader Election, and Snapshot compaction.',
      'Pluggable persistent storage engine utilizing memory-mapped log segments and LevelDB SSTables.',
      'Chaos monkey test harness simulating randomized network delays, dropped heartbeats, and partitioned quorums.'
    ],
    technologies: ['Go', 'gRPC', 'Protocol Buffers', 'LevelDB', 'Raft'],
    githubUrl: 'https://github.com/example/raftkv-engine',
    liveUrl: undefined,
    featured: true,
    status: 'Open Source',
    year: '2025',
    category: 'Backend & Systems',
    order: 2
  },
  {
    id: 'proj-3',
    name: 'Chronos-Query',
    slug: 'chronos-query',
    description: 'Vectorized time-series aggregation library compiling AST queries into SIMD-accelerated execution plans.',
    problemSolved: 'Standard pandas queries on multi-gigabyte financial time-series were bottlenecked by Python object overhead. Chronos-Query translates filter-group-reduce expressions into columnar C++ kernels with zero-copy Apache Arrow interoperability.',
    architectureHighlights: [
      'Recursive descent parser producing a typed intermediate representation (IR) of arithmetic expressions.',
      'Columnar execution engine using AVX2 SIMD instructions to evaluate range predicates in bulk.',
      'Achieved 14.8x query speedup compared to vanilla pandas across 50M sample benchmark datasets.'
    ],
    technologies: ['Python', 'C++', 'NumPy', 'Apache Arrow', 'Pybind11', 'CMake'],
    githubUrl: 'https://github.com/example/chronos-query',
    liveUrl: undefined,
    featured: true,
    status: 'Open Source',
    year: '2025',
    category: 'Developer Tools',
    order: 3
  },
  {
    id: 'proj-4',
    name: 'NexusGraph-Visualizer',
    slug: 'nexusgraph-visualizer',
    description: 'Interactive execution visualizer and profiler for directed acyclic task graphs (DAGs).',
    problemSolved: 'Debugging complex asynchronous workflows in distributed data pipelines is notoriously difficult without visual timeline causality and memory allocation replay.',
    architectureHighlights: [
      'Custom canvas rendering engine maintaining 60 FPS even with 10,000+ connected execution nodes.',
      'Time-travel replay slider allowing developers to inspect variable states and memory footprints at any tick.',
      'Bi-directional WebSocket bridge streaming telemetry from remote execution nodes.'
    ],
    technologies: ['TypeScript', 'React', 'HTML5 Canvas', 'Tailwind CSS', 'WebSockets'],
    githubUrl: 'https://github.com/example/nexusgraph',
    liveUrl: 'https://nexusgraph.dev',
    featured: false,
    status: 'In Progress',
    year: '2026',
    category: 'Web & Frontend',
    order: 4
  },
  {
    id: 'proj-5',
    name: 'KernelByte-FS',
    slug: 'kernelbyte-fs',
    description: 'User-space toy filesystem (FUSE) exploring log-structured storage, inode management, and crash recovery.',
    problemSolved: 'Implemented as an educational dive into operating systems concepts: disk block layouts, directory hashing, and atomic journal commits under simulated kernel panics.',
    architectureHighlights: [
      'Log-structured write buffer minimizing random seek overhead on flash media simulations.',
      'Circular write-ahead journal ensuring complete file consistency across abnormal unmounts.',
      'Comprehensive memory leak audits via Valgrind and address sanitizer (ASan).'
    ],
    technologies: ['C++', 'Linux FUSE', 'POSIX API', 'GTest', 'Valgrind'],
    githubUrl: 'https://github.com/example/kernelbyte-fs',
    liveUrl: undefined,
    featured: false,
    status: 'Archived',
    year: '2024',
    category: 'Backend & Systems',
    order: 5
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    organization: 'Meridian Cloud Labs',
    role: 'Software Engineer Intern (Core Infrastructure)',
    location: 'San Francisco, CA',
    duration: 'May 2025 — Aug 2025',
    startDate: '2025-05',
    endDate: '2025-08',
    description: 'Engineered high-throughput internal routing and load balancing infrastructure supporting 40+ microservices across multi-region Kubernetes clusters.',
    responsibilities: [
      'Designed and deployed an adaptive connection-pooling proxy in Go for upstream gRPC microservices, reducing P99 connection establishment latency by 34%.',
      'Implemented distributed rate-limiting middleware using Redis sliding-window counters with graceful local token bucket fallbacks during network partitions.',
      'Created automated load-testing scenarios in k6 simulating 150,000 concurrent requests to identify memory leaks in serialization hot paths.'
    ],
    technologies: ['Go', 'gRPC', 'Kubernetes', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
    achievements: [
      'Eliminated connection starvation incidents under sudden traffic spikes across production clusters.',
      'Authored internal design RFC for zero-downtime service mesh certificate rotations.'
    ],
    order: 1
  },
  {
    id: 'exp-2',
    organization: 'Systems & Networking Research Lab',
    role: 'Undergraduate Research Assistant',
    location: 'University Campus',
    duration: 'Sep 2024 — Apr 2025',
    startDate: '2024-09',
    endDate: '2025-04',
    description: 'Conducted empirical performance investigations into NVMe-oF (NVMe over Fabrics) storage disaggregation and cache-eviction heuristics under uneven write workloads.',
    responsibilities: [
      'Built benchmarking harnesses in C++ and Python utilizing Linux io_uring for kernel-bypass asynchronous I/O submission.',
      'Analyzed tail latency distributions across modern multi-queue SSD controllers, identifying lock contention in block-layer device drivers.',
      'Co-authored technical report evaluating 2Q and ARC cache policies under bursty access distributions.'
    ],
    technologies: ['C++', 'Python', 'Linux Kernel (io_uring)', 'Bash', 'Gnuplot', 'NumPy'],
    achievements: [
      'Awarded Undergraduate Research Grant for high-concurrency storage benchmarking methodology.',
      'Delivered paper presentation at the University Systems Symposium.'
    ],
    order: 2
  },
  {
    id: 'exp-3',
    organization: 'VectorKit Open Source Community',
    role: 'Core Contributor & Maintainer',
    location: 'Remote / Open Source',
    duration: 'Jan 2024 — Present',
    startDate: '2024-01',
    endDate: 'Present',
    description: 'Active contributor to an open-source vector similarity search library tailored for local embeddings and edge search workloads.',
    responsibilities: [
      'Ported Euclidean distance calculation routines to AVX-512 SIMD assembly, achieving 4.1x throughput improvement.',
      'Triaged 80+ community issues, reviewed external pull requests, and maintained continuous integration pipelines.',
      'Documented mathematical foundations of Hierarchical Navigable Small World (HNSW) graphs for developer onboarding.'
    ],
    technologies: ['Python', 'C++', 'SIMD (AVX2/AVX-512)', 'GitHub Actions', 'Sphinx'],
    achievements: [
      'Over 4,200 GitHub stars and 120,000 monthly downloads across PyPI.',
      'Maintained 96%+ test coverage and zero regression tolerance across multi-platform build matrices.'
    ],
    order: 3
  }
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    description: 'Core languages used daily for systems programming, data pipelines, and production services.',
    items: [
      { name: 'Python', note: 'FastAPI, Asyncio, Pybind11' },
      { name: 'C++', note: 'C++17/20, STL, SIMD, POSIX' },
      { name: 'Go', note: 'Concurrency, gRPC, Goroutines' },
      { name: 'TypeScript', note: 'Strict typing, Node, React' },
      { name: 'SQL', note: 'Query optimization, indexing, CTEs' },
      { name: 'Bash', note: 'Linux automation, scripting' }
    ]
  },
  {
    category: 'Backend & Systems',
    description: 'Architectures, protocols, and data layers for reliable, fault-tolerant infrastructure.',
    items: [
      { name: 'FastAPI', note: 'Async REST APIs, Pydantic' },
      { name: 'PostgreSQL', note: 'Partitioning, connection pooling' },
      { name: 'Redis', note: 'Caching, pub/sub, rate limiters' },
      { name: 'gRPC & Protocol Buffers', note: 'Inter-service RPC' },
      { name: 'Distributed Consensus', note: 'Raft protocol, quorums' },
      { name: 'Microservices Architecture', note: 'Idempotency, circuit breakers' }
    ]
  },
  {
    category: 'Frontend & UI',
    description: 'Modern component-driven web interfaces built with strict typing and clean design systems.',
    items: [
      { name: 'React', note: 'Hooks, context, functional architecture' },
      { name: 'TypeScript', note: 'Type-safe contracts, generics' },
      { name: 'Tailwind CSS', note: 'Design systems, zero-slop layouts' },
      { name: 'Vite', note: 'Modern ESM build toolchains' },
      { name: 'HTML5 Canvas', note: 'Performance visualization, graphs' }
    ]
  },
  {
    category: 'Data & Machine Learning',
    description: 'Computational tools for data exploration, vector similarity, and scientific evaluation.',
    items: [
      { name: 'NumPy & Pandas', note: 'Vectorized numerical pipelines' },
      { name: 'Scikit-learn', note: 'Classical statistical models' },
      { name: 'Apache Arrow', note: 'Columnar memory formats' },
      { name: 'Vector Databases', note: 'HNSW, embeddings indexing' },
      { name: 'Statistical Testing', note: 'Bayesian change-point, quantiles' }
    ]
  },
  {
    category: 'DevOps & Tooling',
    description: 'Observability, containerization, and build pipelines ensuring reproducible releases.',
    items: [
      { name: 'Docker & Compose', note: 'Reproducible multi-stage builds' },
      { name: 'Git & GitHub Actions', note: 'Automated CI/CD pipelines' },
      { name: 'Linux / Unix', note: 'Kernel primitives, system calls' },
      { name: 'Prometheus & Grafana', note: 'Metrics collection, alerts' },
      { name: 'Valgrind & ASan', note: 'Memory safety, leak diagnostics' }
    ]
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Architecting for P99: Tackling Tail Latency in Distributed Systems',
    slug: 'architecting-predictable-latency-microservices',
    excerpt: 'Average latency is a vanity metric. Here is why the 99th percentile matters, why connection pools starve during sudden spikes, and how to design backpressure into service boundaries.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'Backend',
    tags: ['Distributed Systems', 'Tail Latency', 'FastAPI', 'Architecture', 'Networking'],
    status: 'published',
    publishedAt: '2026-08-14',
    readingTime: '7 min read',
    author: {
      name: 'Julian Thorne',
      role: 'Software Engineer'
    },
    seoTitle: 'Architecting for P99 Tail Latency — Julian Thorne',
    seoDescription: 'Techniques for mitigating high percentile tail latency in distributed microservices and database connection pools.',
    views: 1420,
    content: `When engineers benchmark a service, the immediate instinct is to look at average latency. 

"Look, our average response time is 18ms!"

In a distributed topology where a single client request fans out to six downstream microservices, average latency is almost entirely meaningless. If each downstream call has a 99th percentile response time of 500ms, the probability that your user experiences a 500ms delay is not 1%—it approaches nearly 6%:

\`\`\`math
P(at least one slow call) = 1 - (1 - 0.01)^6 ≈ 5.85%
\`\`\`

As service fan-out expands to 20 or 50 dependencies, the 99th percentile effectively becomes the *median* user experience.

---

### The Three Silent Killers of P99

Over the past two years of inspecting traces and debugging service brownouts, tail latency almost invariably stems from three predictable pitfalls:

1. **Unbounded Connection Starvation**: When a microservice receives a 20% traffic bump, its database connection pool quickly saturates. New requests sit waiting in a FIFO queue inside the application process before even touching the socket.
2. **Head-of-Line Blocking in Synchronous RPCs**: One slow serialization routine on a single worker blocks concurrent requests sharing the event loop.
3. **Coordinated Garbage Collection or JVM / OS Page Swapping**: When the kernel flushes dirty pages or a runtime enters a stop-the-world cycle, latency leaps by an order of magnitude.

### Strategy 1: Bounded Queueing & LIFO Eviction

Traditional connection pooling uses a First-In-First-Out (FIFO) queue for pending queries. During a sudden load spike, this is the worst possible strategy. By the time a queued request reaches the front of the line, the client's HTTP timeout has already expired. You are spending database cycles fulfilling a query whose caller has already hung up!

Instead, implementing **Last-In-First-Out (LIFO)** queueing with aggressive deadline timeouts ensures that freshly arrived requests receive immediate execution while obsolete requests are discarded early:

\`\`\`python
import asyncio
import time
from typing import Optional

class DeadlinedTaskQueue:
    """Bounded LIFO queue with absolute deadline shedding."""
    def __init__(self, maxsize: int = 100):
        self._stack = []
        self._maxsize = maxsize

    def push(self, task, deadline_seconds: float) -> bool:
        if len(self._stack) >= self._maxsize:
            # Drop oldest work immediately to shed stale load
            self._stack.pop(0)
            
        expire_at = time.monotonic() + deadline_seconds
        self._stack.append((task, expire_at))
        return True

    def pop_valid(self) -> Optional[any]:
        now = time.monotonic()
        while self._stack:
            task, expire_at = self._stack.pop() # LIFO behavior
            if expire_at > now:
                return task
            # Shed expired task silently
        return None
\`\`\`

### Strategy 2: Hedged Requests with Speculative Retries

Introduced by Google in the *The Tail at Scale* paper, hedged requests mitigate server-side hiccups without generating reckless redundant load.

Instead of issuing two requests simultaneously, send the initial RPC to Replica A. If Replica A does not respond within the 95th percentile expected latency (e.g. 25ms), issue a secondary speculative request to Replica B. Whichever replica returns first completes the future; the slower call is cancelled.

\`\`\`python
async def query_with_hedge(client_a, client_b, query: str, p95_timeout: float = 0.025):
    task_a = asyncio.create_task(client_a.execute(query))
    
    # Wait for either completion or the hedge deadline
    done, pending = await asyncio.wait([task_a], timeout=p95_timeout)
    if task_a in done:
        return task_a.result()

    # Speculatively issue secondary request to Replica B
    task_b = asyncio.create_task(client_b.execute(query))
    done_fast, _ = await asyncio.wait(
        [task_a, task_b], 
        return_when=asyncio.FIRST_COMPLETED
    )
    
    winner = list(done_fast)[0]
    # Cancel the lagging speculative task
    for t in [task_a, task_b]:
        if t != winner and not t.done():
            t.cancel()
            
    return winner.result()
\`\`\`

### Empirical Results

In our internal benchmarks with simulated network jitter:
- Raw P50 remained steady at 12ms.
- Unhedged P99 surged to 480ms during network congestion.
- With LIFO deadline shedding and hedged retries at P95, the P99 collapsed to 41ms—an **11.7x improvement**.

### Takeaways for Systems Engineers

- Measure P90, P99, and P99.9. Discard the average.
- Never let queues grow unbounded; fail early and fail loudly.
- Give every internal request an explicit deadline that propagates down the call graph via context headers.
- Remember: mechanical sympathy with hardware and operating system schedulers beats magical framework abstractions every single time.`
  },
  {
    id: 'post-2',
    title: 'Building a Raft Consensus Engine From Scratch: Lessons in Edge Cases',
    slug: 'building-raft-consensus-from-first-principles',
    excerpt: 'The Raft paper is famously understandable, until you actually attempt to implement split-brain recovery, log truncation, and snapshotting under real network packet drops.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Computer Science',
    tags: ['Consensus', 'Raft', 'Go', 'Distributed Systems', 'Algorithms'],
    status: 'published',
    publishedAt: '2026-06-28',
    readingTime: '9 min read',
    author: {
      name: 'Julian Thorne',
      role: 'Software Engineer'
    },
    seoTitle: 'Building Raft Consensus From Scratch — Julian Thorne',
    seoDescription: 'Key insights, edge cases, and testing strategies when implementing the Raft distributed consensus protocol from scratch.',
    views: 980,
    content: `When Diego Ongaro and John Ousterhout published *"In Search of an Understandable Consensus Algorithm"* in 2014, they set out to replace Paxos with an intuitive protocol.

The core premise of Raft is decomposed into three distinct sub-problems:
1. **Leader Election**
2. **Log Replication**
3. **Safety & Invariants**

On paper, this sounds clean. But in practical implementation, the devil lives entirely inside the edge cases: asymmetric network partitions, stale leaders receiving delayed heartbeats, and disk serialization boundaries.

---

### The Architecture of a Raft Node

In Go, our Raft node runs three concurrent loops:

\`\`\`go
type NodeState int

const (
    Follower NodeState = iota
    Candidate
    Leader
)

type RaftNode struct {
    mu        sync.Mutex
    peers     []*rpc.Client
    me        int
    
    // Persistent state on all servers
    currentTerm int
    votedFor    int
    log         []LogEntry
    
    // Volatile state
    commitIndex int
    lastApplied int
    state       NodeState
    
    electionTimeout  time.Duration
    heartbeatTimeout time.Duration
    lastHeartbeat    time.Time
}
\`\`\`

### Edge Case 1: Split-Brain Vote Cycles and Randomized Timers

If all nodes time out simultaneously, every node transitions to \`Candidate\` and votes for itself. None wins a majority, resulting in repeated split-vote stalemates.

Raft resolves this by randomizing election timeouts:
\`\`\`go
func randomizedElectionTimeout() time.Duration {
    base := 150 * time.Millisecond
    jitter := time.Duration(rand.Intn(150)) * time.Millisecond
    return base + jitter
}
\`\`\`

**Crucial detail**: The election timeout must be significantly longer than the round-trip broadcast time between nodes, but short enough to maintain fast failure detection.

### Edge Case 2: The Phantom Leader Overthrow

Consider a 5-node cluster (\`Node 0\` through \`Node 4\`). \`Node 0\` is the legitimate leader.
A partition isolates \`Node 4\` from all other nodes. \`Node 4\` cannot hear heartbeats, increments its term repeatedly:

\`\`\`
Term 1 -> Term 2 -> Term 3 ... -> Term 12
\`\`\`

When the partition heals, \`Node 4\` broadcasts a \`RequestVote\` with Term 12. Because Term 12 > Term 1, \`Node 0\` immediately steps down, disrupting an otherwise healthy cluster!

**The Fix: Pre-Vote Phase**:
Before incrementing its term, a candidate must first issue a speculative \`PreVote\` RPC. Only if a quorum of peers confirms they have *also* experienced an election timeout does the candidate officially increment its term.

### Verification with Deterministic Chaos Testing

How do you test consensus code? You cannot rely on \`time.Sleep()\`. We built a deterministic simulation harness that models a virtual network switch.

The harness can:
- Intercept any RPC message.
- Re-order, duplicate, or delay packets arbitrarily.
- Sever bidirectional links between arbitrary sets of nodes.

Under 100,000 randomized state transitions, the simulator proved our linearizability invariants held across every simulated failure.

### Final Thoughts

Writing a consensus algorithm is one of the most humbling exercises in software engineering. It strips away faith in network reliability and forces you to confront every assumption you made about time, ordering, and causality.`
  },
  {
    id: 'post-3',
    title: 'Scaling FastAPI with Async PostgreSQL: Beyond the Default Connection Pool',
    slug: 'python-fastapi-database-concurrency',
    excerpt: 'FastAPI async route handlers can handle thousands of concurrent requests—until your relational database pool gives up. Here is how to configure SQLAlchemy and asyncpg for real production workloads.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    category: 'Backend',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Performance'],
    status: 'published',
    publishedAt: '2026-05-10',
    readingTime: '6 min read',
    author: {
      name: 'Julian Thorne',
      role: 'Software Engineer'
    },
    seoTitle: 'Scaling FastAPI with Async PostgreSQL — Julian Thorne',
    seoDescription: 'Optimizing asyncpg connection pooling, session lifecycles, and transaction boundaries in high-load FastAPI applications.',
    views: 1870,
    content: `FastAPI has gained massive popularity for building clean Python microservices with native async/await support. However, many engineering teams discover an uncomfortable surprise when running load tests:

*The API easily handles 20,000 req/sec on hello-world endpoints, but completely chokes at 400 req/sec the moment a database query is involved.*

The culprit is almost never FastAPI itself; it is how the asynchronous database connection pool and ORM session lifecycles are configured.

---

### The Common Pitfalls

1. **Holding Sessions Across Network I/O**: Opening a database transaction, making an external third-party HTTP call, and then committing. During that external call, the database connection is locked and unusable by any other request.
2. **Improper Connection Pool Sizing**: Setting \`pool_size=100\` on 8 Uvicorn worker processes, creating 800 open connections to PostgreSQL. PostgreSQL handles connections via OS processes; 800 processes thrash CPU cache lines and cause massive context-switching overhead.
3. **Mixing Sync Blocking Drivers in Async Handlers**: Calling standard psycopg2 or synchronous SQLAlchemy inside an \`async def\` route freezes the entire Python event loop.

### The Correct Async Engine Configuration

Here is our battle-tested setup utilizing \`asyncpg\` and \`SQLAlchemy 2.0\`:

\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from contextlib import asynccontextmanager

DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/production_db"

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=20,           # Max steady-state connections per worker
    max_overflow=10,        # Burst headroom during short spikes
    pool_timeout=5.0,       # Fail fast instead of hanging client requests
    pool_recycle=1800,      # Recycle stale connections after 30 min
    pool_pre_ping=True,     # Verify connection health before lease
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False, # Critical for async performance
    autoflush=False,
)

@asynccontextmanager
async def get_db_session() -> AsyncSession:
    """Explicit context manager ensuring deterministic session cleanup."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
\`\`\`

### Why \`expire_on_commit=False\` Matters

By default, SQLAlchemy expires all attributes on model instances when a transaction commits. When your endpoint later accesses an attribute (like \`user.email\` during response serialization), SQLAlchemy attempts to issue another hidden \`SELECT\` query! In an asynchronous context, this leads to \`MissingGreenlet\` runtime exceptions or unexpected hidden queries.

Setting \`expire_on_commit=False\` keeps all loaded data in memory, avoiding secondary trips to the database.

### Benchmarks: 400 req/sec to 4,800 req/sec

By tuning connection pool parameters, decoupling transaction lifecycles from serialization, and placing PgBouncer in transaction mode in front of PostgreSQL, our synthetic P99 dropped from 1,420ms to 24ms under 4,800 sustained queries per second.

Engineering backend systems is about aligning software structure with hardware limits.`
  },
  {
    id: 'post-4',
    title: 'Notes on Rust Borrow Checking for Systems Programmers',
    slug: 'learning-rust-for-cpp-engineers',
    excerpt: 'Coming from modern C++, the Rust borrow checker feels like a tyrannical compiler until you realize it is formally enforcing RAII invariants you were already trying to keep in your head.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    category: 'Computer Science',
    tags: ['Rust', 'C++', 'Memory Safety', 'Compilers', 'Systems'],
    status: 'published',
    publishedAt: '2026-03-02',
    readingTime: '5 min read',
    author: {
      name: 'Julian Thorne',
      role: 'Software Engineer'
    },
    seoTitle: 'Rust Borrow Checking for Systems Programmers — Julian Thorne',
    seoDescription: 'Bridging the conceptual gap between C++ smart pointers and Rust affine types and borrow semantics.',
    views: 740,
    content: `For developers with an extensive background in C++17/20, learning Rust is a distinct experience. You don't need anyone to explain what stack allocation is, why cache locality matters, or how virtual dispatch tables function.

Yet almost every systems programmer slams into a wall during their first two weeks with the borrow checker.

---

### The Core Paradigm Shift: Affine Types

In C++, move semantics (\`std::move\`) are essentially an opt-in library convention. When you move an object in C++, the source object remains in a valid but unspecified state. You can still accidentally invoke methods on it, leading to subtle runtime bugs:

\`\`\`cpp
// Modern C++
std::vector<int> data = {1, 2, 3};
process(std::move(data));
// Dangerous: data is moved-from, but compiler permits access!
std::cout << data.size() << std::endl; 
\`\`\`

In Rust, moves are a fundamental property of the type system. Ownership is affine: once a value is moved, its identifier is statically invalidated at compile time:

\`\`\`rust
// Rust
let data = vec![1, 2, 3];
process(data);
// Compile Error: borrow of moved value: \`data\`
// println!("{}", data.len());
\`\`\`

### Aliasing XOR Mutability

The single most profound insight in Rust's design is not merely memory safety—it is the **Aliasing XOR Mutability** rule:

> You can have any number of immutable references (\`&T\`), OR you can have exactly one mutable reference (\`&mut T\`), but never both simultaneously.

This invariant eliminates data races in multi-threaded code at zero runtime cost. In C++, race conditions often occur because two threads hold non-exclusive pointers to the same memory segment while one thread mutates it. In Rust, that state cannot be expressed in safe code.

### When Unsafe is Actually Justified

Does Rust eliminate all need for \`unsafe\`? Absolutely not. Low-level building blocks like:
- Custom intrusive doubly-linked lists
- Ring buffers for circular memory
- Direct hardware registers and OS kernel interfaces

...all necessitate raw pointers. But the beauty of Rust is that \`unsafe\` blocks act as clear, audited containment boundaries. You wrap the unsafe memory manipulation in a sound, safe public API.`
  }
];
