export type ProjectCategory = "AI" | "Systems" | "ML" | "Accessibility"

export type Project = {
  id: number
  title: string
  tagline: string
  tech: string[]
  github: string
  category: ProjectCategory
  featured?: boolean
  impactBullets: string[]
  whatIBuilt: string
  overview: string
  challenges: string[]
  solutions: string[]
  architecture: string[]
  flow: string[]
  metrics: string[]
  color: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "LLM Inference Gateway",
    tagline: "A resilient routing layer for model selection, fallback, and latency-aware inference.",
    tech: ["FastAPI", "Python", "Redis", "PostgreSQL", "Prometheus"],
    github: "https://github.com/ShashankMk031/LLM-Inference-Gateway.git",
    category: "Systems",
    featured: true,
    impactBullets: [
      "Multi-provider routing with ordered fallback",
      "Maintains availability under upstream failures",
      "Tracks latency, cost, and token usage",
    ],
    whatIBuilt:
      "Built a gateway that standardizes inference requests across multiple LLM providers and chooses the best path based on live health, latency, and fallback policy.",
    overview:
      "The gateway turns model access into a production systems problem: route quality, failure recovery, retries, and observability are treated as core features rather than afterthoughts.",
    challenges: [
      "Provider latency and reliability changed by traffic window, so static routing produced inconsistent performance.",
      "Retries and fallback needed to recover transient failures without multiplying upstream load.",
      "Operators needed clear visibility into why a model was selected, retried, or replaced.",
    ],
    solutions: [
      "Added latency-aware model scoring using recent health snapshots and policy constraints.",
      "Implemented bounded retries and explicit fallback chains to recover safely from transient errors.",
      "Instrumented route choice, retry count, failure classes, and latency bands through metrics and structured logs.",
    ],
    architecture: [
      "Ingress layer normalizes prompts, model constraints, and response shape before provider-specific handling.",
      "Routing engine ranks candidate models using rolling latency windows, health signals, and policy rules.",
      "Retry coordinator handles transient failures like timeouts and rate limits with bounded retry budgets.",
      "Fallback manager promotes the next viable provider when the primary path is degraded or unavailable.",
      "Metrics pipeline records route decisions, retry counts, failure categories, latency bands, and provider success rates.",
    ],
    flow: [
      "Client sends a normalized inference request with task metadata, latency target, and fallback policy.",
      "Gateway validates the payload and derives a candidate provider list based on compatibility rules.",
      "Router scores the candidates using recent latency, health, and policy signals, then selects a primary path.",
      "Dispatcher executes the request and streams provider metadata, status, and timing into observability hooks.",
      "If the primary attempt fails transiently, the retry layer applies bounded retries before escalation.",
      "If retries do not recover the request, fallback logic promotes the next provider in the ranked chain.",
      "Gateway returns a stable response contract while metrics and structured logs capture the full routing path.",
    ],
    metrics: [
      "P95 routing overhead stayed under 40 ms before the upstream inference call.",
      "Fallback recovered a large share of transient provider failures without changing the caller contract.",
      "Retry instrumentation exposed unstable upstreams early through timeout-rate and error-class dashboards.",
      "Latency-aware routing reduced tail-latency variance during traffic spikes by preferring healthier providers in real time.",
    ],
    color: "from-red-500 via-rose-500 to-orange-400",
  },
  {
    id: 2,
    title: "DataForge",
    tagline: "A structured data generation system for turning prompts into clean training-ready datasets.",
    tech: ["Python", "LLMs", "JSON Schema", "Validation"],
    github: "https://github.com/ShashankMk031/DataForge.git",
    category: "AI",
    impactBullets: [
      "Schema-first dataset generation pipeline",
      "Rejects malformed outputs before export",
      "Reduces cleanup for downstream training",
    ],
    whatIBuilt:
      "Built a synthetic data generation system that produces structured records, validates them against schema rules, and exports cleaner artifacts for training workflows.",
    overview:
      "DataForge focuses on making LLM-generated data usable at scale by enforcing structure, repeatability, and cleanup inside the pipeline.",
    challenges: [
      "Raw model outputs were inconsistent and often unsuitable for direct downstream use.",
      "New dataset tasks needed to be added without rewriting the pipeline core.",
      "Quality checks had to scale with batch volume instead of relying on manual review.",
    ],
    solutions: [
      "Applied schema validation gates before records could move to export.",
      "Separated task templates from execution logic to keep the system extensible.",
      "Added repair and normalization steps so malformed rows could be fixed or dropped automatically.",
    ],
    architecture: [
      "Template registry separates task definitions from execution logic.",
      "Prompt builder injects schema requirements and guardrails into generation requests.",
      "Validation gate checks each output against structural rules before it moves downstream.",
      "Repair layer normalizes fields, strips noise, and enforces type consistency.",
      "Export layer packages accepted records into consistent artifacts for training workflows.",
    ],
    flow: [
      "User selects a task template and target output schema for the dataset run.",
      "Prompt builder constructs constrained generation requests from the template configuration.",
      "Generator produces candidate records using the configured LLM pipeline.",
      "Validation checks each record for required keys, type safety, and content constraints.",
      "Repair logic retries or normalizes malformed rows according to policy.",
      "Accepted records are assembled into a clean dataset bundle for downstream consumption.",
    ],
    metrics: [
      "Validation gating reduced malformed outputs before export and improved downstream ingestion reliability.",
      "Template-driven batches made it faster to expand into new dataset formats without core pipeline changes.",
      "Integrated cleanup lowered the amount of manual correction required before training or evaluation.",
      "Structured exports improved repeatability across synthetic data generation runs.",
    ],
    color: "from-sky-500 via-blue-500 to-cyan-400",
  },
  {
    id: 3,
    title: "Music Recommender",
    tagline: "An offline recommendation engine that maps listener taste using audio similarity signals.",
    tech: ["Python", "scikit-learn", "k-NN", "Audio Features"],
    github: "https://github.com/ShashankMk031/DCM.git",
    category: "ML",
    impactBullets: [
      "Local recommendation engine with fast lookup",
      "Transparent similarity scoring using audio features",
      "Easy to inspect and debug recommendations",
    ],
    whatIBuilt:
      "Built a recommendation system that uses engineered audio features and nearest-neighbor retrieval to surface similar tracks without depending on external ranking services.",
    overview:
      "The project emphasizes interpretable recommendations where feature scaling, similarity distance, and ranking behavior can be inspected directly.",
    challenges: [
      "Audio features operate on very different scales and can distort similarity scores.",
      "The system needed to stay lightweight while still feeling responsive.",
      "Recommendations needed to be explainable rather than opaque.",
    ],
    solutions: [
      "Normalized the feature space so no single audio signal dominated distance calculations.",
      "Used a local k-NN index for fast retrieval without remote infrastructure.",
      "Kept the ranking stack simple and inspectable to support debugging and feature tuning.",
    ],
    architecture: [
      "Feature ingestion layer standardizes track metadata and audio descriptors into a training matrix.",
      "Preprocessing pipeline scales numeric features for stable similarity calculations.",
      "Similarity engine builds a nearest-neighbor index for fast local recommendation lookup.",
      "Query transformer converts a selected track into the same vector space used during indexing.",
      "Ranking layer returns the closest matches with traceable similarity-oriented explanations.",
    ],
    flow: [
      "Audio metadata and engineered features are loaded into the local recommendation dataset.",
      "Preprocessing normalizes the feature space for stable distance calculations.",
      "Nearest-neighbor indexing prepares the dataset for similarity search.",
      "A selected track is encoded into a query vector using the same preprocessing path.",
      "The retrieval engine returns the closest songs as ranked recommendations.",
      "Output formatting surfaces the final list for interactive exploration or downstream use.",
    ],
    metrics: [
      "Local recommendation latency stayed low enough for interactive use without remote infrastructure.",
      "Similarity-based outputs were easier to inspect and refine than opaque ranking scores.",
      "The pipeline remained lightweight while still producing relevant neighboring tracks.",
      "Feature-level debugging made it easier to explain and improve recommendation behavior.",
    ],
    color: "from-emerald-500 via-green-500 to-lime-400",
  },
  {
    id: 4,
    title: "BlinkOS",
    tagline: "Hands-free computer control using eye tracking + voice",
    tech: ["Python", "Computer Vision", "Speech Recognition", "Real-time Systems"],
    github: "https://github.com/ShashankMk031/BlinkOS.git",
    category: "Accessibility",
    impactBullets: [
      "Multimodal eye + voice control system",
      "Supports 40+ voice commands",
      "Real-time feedback for accessibility use cases",
    ],
    whatIBuilt:
      "Built an accessibility system that combines eye tracking, blink detection, and voice commands to let users control a computer without traditional input devices.",
    overview:
      "BlinkOS treats accessibility as a systems problem where input capture, calibration, intent mapping, and low-latency response all have to work together reliably.",
    challenges: [
      "Assistive control becomes unusable quickly if cursor or command feedback lags.",
      "Different users and webcam placements require calibration to stay accurate.",
      "Eye and voice signals needed to be coordinated without confusing intent resolution.",
    ],
    solutions: [
      "Used a real-time processing pipeline for gaze, blink, and speech events.",
      "Added a calibration engine to adapt to user and device-specific variation.",
      "Introduced an input fusion layer to combine pointing context with command execution.",
    ],
    architecture: [
      "Eye tracking module estimates gaze position and converts landmarks into cursor movement signals.",
      "Voice command pipeline captures speech, performs transcription, and maps intents to OS actions.",
      "Calibration engine adapts tracking behavior to the user, device position, and session drift.",
      "Input fusion layer coordinates gaze and voice so pointing and command execution stay synchronized.",
      "Logging and error handling modules capture failures and ambiguous inputs for debugging.",
    ],
    flow: [
      "Capture webcam frames and microphone input continuously from the client device.",
      "Process gaze landmarks to estimate cursor direction and movement intensity.",
      "Detect blink patterns and map them to click or confirmation events.",
      "Convert voice input into text through the speech recognition stage.",
      "Parse the transcript into intents and map them to supported control commands.",
      "Fuse gaze context with parsed voice intent to execute OS-level actions.",
      "Provide user feedback and log system events for adaptation and debugging.",
    ],
    metrics: [
      "Real-time responsiveness was maintained as a core product constraint for cursor and command feedback.",
      "Support for 40+ voice commands expanded usability beyond basic pointer control.",
      "Adaptive calibration improved tracking accuracy across different users and session conditions.",
      "Structured logging made it easier to diagnose ambiguous gaze and speech interactions.",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "FuseLLM",
    tagline: "Multi-pipeline modular AI assistant",
    tech: ["Python", "HuggingFace", "NLP", "Multimodal AI"],
    github: "https://github.com/ShashankMk031/FuseLLM.git",
    category: "AI",
    impactBullets: [
      "Routes requests across specialized AI pipelines",
      "Balances speed, cost, and response quality",
      "Fuses outputs into one validated response",
    ],
    whatIBuilt:
      "Built a modular assistant runtime that detects task type, routes work to specialized pipelines, and fuses the results into a single validated response.",
    overview:
      "FuseLLM avoids one-model-for-everything design by composing smaller task-specific systems with validation and formatting layers around them.",
    challenges: [
      "Different modalities and tasks needed different model pathways.",
      "Multiple outputs had to be reconciled without losing consistency.",
      "Composed systems increase the chance of conflicting or low-confidence responses.",
    ],
    solutions: [
      "Added an intent and modality router to select the best pipeline set for each request.",
      "Built a fusion stage to combine partial outputs into a coherent final answer.",
      "Wrapped execution with validation and safety checks before returning responses.",
    ],
    architecture: [
      "Input detection layer identifies whether the request is text, image, audio, or mixed.",
      "Task routing engine classifies intent and chooses the right specialized pipeline set.",
      "Context retrieval system fetches supporting information needed by downstream models.",
      "Pipeline execution layer runs selected models independently with task-specific preprocessors.",
      "Fusion engine reconciles outputs into a single assistant response with conflict-aware formatting.",
    ],
    flow: [
      "Detect the input modality and normalize it into a routing-friendly request envelope.",
      "Classify the user intent to determine which specialized capabilities are needed.",
      "Route the request to the relevant pipeline set based on modality and task type.",
      "Retrieve supporting context or reference data before model execution.",
      "Execute the selected pipelines and collect their intermediate outputs.",
      "Fuse the outputs into one coherent response while resolving overlaps or disagreements.",
      "Validate the final response and return it through a consistent interface.",
    ],
    metrics: [
      "The system supports multimodal inputs across text, image, and audio-oriented workflows.",
      "Targeted routing kept many requests faster than sending everything to a single larger model stack.",
      "Fusion quality improved complex responses but introduced measurable quality-speed tradeoffs worth monitoring.",
      "Modular execution made it easier to swap or benchmark individual pipelines independently.",
    ],
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 6,
    title: "MicroTune",
    tagline: "LoRA-based math reasoning system",
    tech: ["LoRA", "Gemma", "FastAPI", "Gradio"],
    github: "https://github.com/ShashankMk031/MicroTune.git",
    category: "ML",
    impactBullets: [
      "Parameter-efficient fine-tuning pipeline",
      "FastAPI serving with Gradio testing UI",
      "Evaluation-first workflow for reasoning quality",
    ],
    whatIBuilt:
      "Built a compact math reasoning stack with LoRA fine-tuning, evaluation, local inference serving, and an interactive UI for testing model behavior.",
    overview:
      "MicroTune separates training, evaluation, serving, and export so model experimentation stays controlled and deployable.",
    challenges: [
      "Math reasoning quality had to be measured consistently across training runs.",
      "Fine-tuning needed to stay resource-efficient and practical to iterate on.",
      "Serving and experimentation had to stay decoupled to avoid messy deployment flow.",
    ],
    solutions: [
      "Used LoRA to reduce training cost and speed up experimentation.",
      "Built a dedicated evaluation stage to track exact match and failure patterns.",
      "Separated inference APIs and UI testing from the training pipeline for cleaner deployment.",
    ],
    architecture: [
      "Dataset preprocessing pipeline converts GSM8K-style examples into trainable prompt-target pairs.",
      "LoRA training pipeline fine-tunes a Gemma-based model with parameter-efficient adapters.",
      "Evaluation system measures exact match and error patterns across held-out reasoning tasks.",
      "Inference API exposes the tuned model through a FastAPI service for programmatic access.",
      "UI layer provides a Gradio front end for local interactive testing and demonstrations.",
    ],
    flow: [
      "Preprocess the math reasoning dataset into trainable prompt-response examples.",
      "Train a LoRA adapter on the target base model with task-specific hyperparameters.",
      "Run the evaluation suite to measure exact match and inspect failure modes.",
      "Serve the tuned model behind a FastAPI endpoint for inference access.",
      "Expose the workflow through a Gradio interface for interactive testing.",
      "Merge or export the model artifacts for deployment or local packaging.",
    ],
    metrics: [
      "Exact match accuracy is tracked from the evaluation pipeline rather than ad hoc manual checks.",
      "Local inference performance stayed practical for interactive testing and API-backed demos.",
      "The modular evaluation pipeline made it easier to compare adapter versions and failure modes.",
      "Parameter-efficient tuning reduced the cost and complexity of repeated math-reasoning experiments.",
    ],
    color: "from-indigo-500 to-blue-600",
  },
]
