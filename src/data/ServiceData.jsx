import React from 'react';
import { MessageSquare, Cpu, Database, Briefcase, Network, Settings } from 'lucide-react';

export const servicesData = [
  {
    id: "ai-chatbot",
    icon: <MessageSquare size={32} />,
    title: "AI Chatbot Development",
    shortDesc: "Intelligent conversational agents that handle customer support, lead generation, and workflow automation 24/7.",
    fullDesc: "Our AI chatbots go beyond simple decision trees. Powered by state-of-the-art Large Language Models (LLMs), these intelligent agents can understand context, infer user intent, and execute complex workflows. They seamlessly integrate with your existing support pipelines, databases, and e-commerce platforms to provide 24/7 immediate assistance, reducing human agent strain by up to 70%.",
    features: [
      "Natural Language Understanding (NLU)",
      "Multi-channel deployment (Web, WhatsApp, Slack)",
      "Seamless human hand-off protocols",
      "Real-time sentiment analysis"
    ],
    color: "#B829EA" // Neon Purple
  },
  {
    id: "llm-applications",
    icon: <Cpu size={32} />,
    title: "LLM Application Development",
    shortDesc: "Custom applications powered by Large Language Models tailored to your specific business logic and domain.",
    fullDesc: "Unlock the reasoning capabilities of foundation models. We build bespoke software wrappers around powerful LLMs (like GPT-4 and Claude 3) tailored strictly to your operational goals. Whether it's automated content generation, complex code analysis, or intelligent data parsing, we ensure the outputs are accurate, guardrailed, and highly scalable.",
    features: [
      "Custom prompt engineering and system instructions",
      "Model fine-tuning on proprietary data",
      "Strict safety and hallucination guardrails",
      "API-first microservice architectures"
    ],
    color: "#45F3FF" // Neon Blue
  },
  {
    id: "rag-systems",
    icon: <Database size={32} />,
    title: "RAG Systems",
    shortDesc: "Retrieval Augmented Generation to give AI direct access to your company's proprietary knowledge base.",
    fullDesc: "Generative AI is only as good as the context it receives. Our custom RAG systems connect cutting-edge AI directly to your internal documents, PDFs, Intranets, and Secure databases. We utilize high-performance Vector Databases (like Pinecone or Milvus) to rapidly fetch the exact paragraphs your LLM needs to answer complex employee or customer queries accurately—with full source citation.",
    features: [
      "High-dimensional vector embeddings",
      "Scalable Vector Database architecture",
      "Automated document processing pipelines",
      "Source citation and factual verification"
    ],
    color: "#FF6F00" // Neon Orange
  },
  {
    id: "ai-automation",
    icon: <Briefcase size={32} />,
    title: "AI Automation for Businesses",
    shortDesc: "Streamline operations with AI-driven workflows that eliminate repetitive tasks and increase efficiency.",
    fullDesc: "We audit your existing manual processes and deploy intelligent automation agents to take them over. From automatically categorizing and routing incoming emails, to scheduling meetings, extracting invoice data, or updating CRM entries, our AI automations work tirelessly behind the scenes to free up your human workforce for deep-focus, creative output.",
    features: [
      "End-to-end workflow analysis",
      "Optical Character Recognition (OCR) pipelines",
      "Intelligent routing and classification",
      "RPA (Robotic Process Automation) integration"
    ],
    color: "#EE4C2C" // Bold Red
  },
  {
    id: "custom-ml",
    icon: <Network size={32} />,
    title: "Custom Machine Learning Models",
    shortDesc: "Proprietary models trained on your data to uncover insights, predict trends, and optimize decisions.",
    fullDesc: "When generic foundation models aren't enough, we build from scratch. Our data science team designs, trains, and validates custom machine learning architectures (Computer Vision, Time-Series Forecasting, Anomaly Detection) exclusively on your historical datasets to provide uniquely competitive predictive capabilities.",
    features: [
      "Data cleaning and feature engineering",
      "Deep Learning (PyTorch, TensorFlow) architectures",
      "Model validation and A/B testing",
      "Continuous learning and MLOps deployment"
    ],
    color: "#27c93f" // Neon Green
  },
  {
    id: "api-integration",
    icon: <Settings size={32} />,
    title: "AI API Integration",
    shortDesc: "Seamlessly connect modern AI capabilities like OpenAI or Anthropic into your existing software stack.",
    fullDesc: "Don't want to overhaul your entire product? We offer surgical integration services. We securely plug advanced AI endpoints (OpenAI, Anthropic, Cohere, ElevenLabs) directly into your legacy applications. We handle the complex rate-limiting, load balancing, caching, and fallback logic so your app remains stable while utilizing next-gen intelligence.",
    features: [
      "Multi-provider fallback systems",
      "Semantic caching to reduce API costs",
      "High-throughput load balancing",
      "Comprehensive usage analytics dashboards"
    ],
    color: "#E2E8F0" // Silver
  }
];
