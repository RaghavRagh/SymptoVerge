import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/chat/ChatInterface";
import { Brain, Heart, ShieldCheck } from "lucide-react";

const Index: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/30 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <span className="mr-1">✨</span> AI-Powered Health Assistant
              </div>
              <h1 className="heading-1 mb-4 text-balance">
                Understand your symptoms with AI healthcare assistant
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Describe your symptoms and get AI-powered insights on possible
                conditions. Not a substitute for professional diagnosis, but a
                first step towards understanding your health.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#chatbot" className="btn-primary">
                  Try Now
                </a>
                <a href="#learn-more" className="btn-secondary">
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-auto"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-medical-500 to-medical-300 rounded-2xl blur opacity-30"></div>
                <div className="relative glass-morphism rounded-2xl p-6 shadow-elevated">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                    <div className="h-3 w-3 rounded-full bg-medical-400"></div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart size={16} className="text-primary" />
                      </div>
                      <div className="bg-secondary rounded-lg p-2 rounded-tl-none">
                        How can I help you today?
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary rounded-lg p-2 rounded-tr-none text-primary-foreground">
                        I have had a headache for 3 days with fever
                      </div>
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain size={16} className="text-primary" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart size={16} className="text-primary" />
                      </div>
                      <div className="bg-secondary rounded-lg p-2 rounded-tl-none">
                        Based on your symptoms, you might have...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background" id="learn-more">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI health assistant uses advanced machine learning to help you
              understand your symptoms and find appropriate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-6 w-6" />,
                title: "Symptom Analysis",
                description:
                  "Describe your symptoms in natural language and our AI will analyze them to suggest possible conditions.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Health Information",
                description:
                  "Get reliable information about various health conditions, symptoms, and general wellness advice.",
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Doctor Recommendations",
                description:
                  "Based on your symptoms, we can suggest appropriate medical specialists to consult with.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="subtle-card p-6"
              >
                <div className="bg-primary/10 rounded-full p-3 inline-flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-16 bg-secondary/30" id="chatbot">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Try Our Health Assistant</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Describe your symptoms or ask health-related questions below.
              Remember that this is a demo and not a replacement for
              professional medical advice.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl shadow-elevated overflow-hidden h-[600px] max-w-4xl mx-auto"
          >
            <ChatInterface />
          </motion.div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              This is a demonstration. In a production environment, we would
              connect to a medical database and backend AI models.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
