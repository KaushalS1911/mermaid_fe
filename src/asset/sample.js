export const samples = {
  Flow: `flowchart TD
    A[User Enters Mermaid Mind] --> B{Enter workspace}
    
    B --> C[Write Own Code]
    B --> D[Use AI to Generate Charts]
    
    C --> E[Edit Code]
    C --> F[Export Mermaid Diagrams]
    
    D --> G[Enter Query]
    D --> H[Copy Code]
    D --> I[Directly Import to Workspace]

    subgraph Using AI
        G --> H
        G --> I
    end
    
    subgraph Using Editor
        C --> E
        E --> F
    end
    `,
  Sequence: `sequenceDiagram
    User->>+MermaidMind: Request AI-Generated Mermaid Diagram
    MermaidMind-->>+User: Provides Mermaid Code
    User->>+MermaidMind: Can you refine this diagram?
    MermaidMind-->>-User: Here is the updated version
    User->>+MermaidMind: Thank you!`,
  Class: `classDiagram
    MermaidMind <|-- AIEngine
    MermaidMind <|-- DiagramEditor
    MermaidMind : +generateDiagram()
    MermaidMind : +editDiagram()
    MermaidMind : +saveDiagram()
    AIEngine : +analyzeText()
    AIEngine : +generateMermaidCode()
    DiagramEditor : +renderDiagram()
    DiagramEditor : +provideEditingTools()`,
  State: `stateDiagram-v2
    [*] --> Idle
    Idle --> Generating
    Generating --> [*]
    Generating --> Reviewing
    Reviewing --> Editing
    Editing --> Saving
    Saving --> [*]`,
  Gantt: `gantt
    title Mermaid Mind Project Timeline
    dateFormat  YYYY-MM-DD
    section Development
    Initial Setup           :done, a1, 2024-01-01, 30d
    AI Integration          :active, after a1, 40d
    Testing and QA          :q1, after a1, 20d
    section Deployment
    User Testing            :2024-04-01, 20d
    Final Release           :2024-05-01, 10d`,
  Pie: `pie title Features Usage in Mermaid Mind
    "Diagram Generation" : 50
    "Code Editing" : 20
    "File Download" : 15
    "User Projects" : 15`,
  ER: `erDiagram
    USER ||--o{ PROJECT : creates
    USER ||--o{ DIAGRAM : "has access to"
    PROJECT ||--o{ DIAGRAM : includes
    DIAGRAM ||--|{ FILE : "can be exported as"
    FILE ||--|{ TYPE : "has format"
    TYPE {
        STRING name
    }`,
  Git: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    branch feature/MermaidMind
    checkout feature/MermaidMind
    commit
    commit
    checkout develop
    merge feature/MermaidMind
    commit
    checkout main
    merge develop
    commit`,
  QuadrantChart: `quadrantChart
    title Mermaid Mind Features Impact
    x-axis Low Impact --> High Impact
    y-axis Low Usage --> High Usage
    quadrant-1 Must Keep
    quadrant-2 Needs Improvement
    quadrant-3 Consider Removal
    quadrant-4 Monitor Usage
    Diagram Generation: [0.9, 0.8]
    AI Integration: [0.85, 0.6]
    Code Editing: [0.7, 0.5]
    File Export: [0.4, 0.7]
    User Projects: [0.6, 0.3]`,
  XYChart: `xychart-beta
    title "Mermaid Mind User Growth"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Number of Users" 0 --> 10000
    bar [200, 400, 800, 1500, 3000, 5000, 7000, 8500, 9500, 10000, 9800, 9500]
    line [200, 400, 800, 1500, 3000, 5000, 7000, 8500, 9500, 10000, 9800, 9500]`,
  UserJourney: `journey
    title Mermaid Mind User Experience
    section Onboarding
      Visit Site: 5: User
      Sign Up: 3: User
      Tour Features: 4: User
    section Diagram Creation
      Enter Text: 5: User
      Generate Diagram: 4: User, AI
      Edit Diagram: 3: User
    section Final Steps
      Save Project: 4: User
      Download Diagram: 2: User
      Share with Team: 3: User`
};
