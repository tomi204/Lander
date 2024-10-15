import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Section {
  id: string;
  title: string;
  content: string;
}

const placeholderSections: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: "This is the introduction section of the document. It provides an overview of what's covered."
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: "This section defines key terms used throughout the document."
  },
  {
    id: "user-rights",
    title: "3. User Rights and Responsibilities",
    content: "This section outlines what users can and cannot do, as well as their rights when using the service."
  },
  {
    id: "data-collection",
    title: "4. Data Collection and Use",
    content: "This section explains what data is collected from users and how it's used."
  },
  {
    id: "changes",
    title: "5. Changes to This Policy",
    content: "This section describes how and when changes might be made to this policy and how users will be notified."
  }
];

export default function TermsOfUse( { title = "Legal Document" }: { title?: string; } ) {
  const [activeSection, setActiveSection] = useState( placeholderSections[0].id );

  const handleSectionClick = ( sectionId: string ) => {
    setActiveSection( sectionId );
    const element = document.getElementById( sectionId );
    if ( element ) {
      element.scrollIntoView( { behavior: "smooth" } );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <nav className="sticky top-4">
            <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <ul className="space-y-2">
                {placeholderSections.map( ( section ) => (
                  <li key={section.id}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeSection === section.id ? "bg-secondary" : ""
                        }`}
                      onClick={() => handleSectionClick( section.id )}
                    >
                      {section.title}
                    </Button>
                  </li>
                ) )}
              </ul>
            </ScrollArea>
          </nav>
        </aside>
        <main className="md:w-3/4">
          <ScrollArea className="h-[calc(100vh-100px)]">
            {placeholderSections.map( ( section ) => (
              <section key={section.id} id={section.id} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className="text-muted-foreground">{section.content}</p>
              </section>
            ) )}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}