// import { ObjectionSection2 } from "./objectbygpt";

import { ObjectionSection } from "./ObjectionSection";


export function Gauntlet() {
    const sections = [
        {
            type: "OBJECTION",
            prompt: "Too expensive.",
            response: "I understand budget is important. Let me show you the ROI...",
            objectionData: {
                cost: "$2,000/mo",
                revenue: "$40,000",
                roi: "2000%",
            },
            progress: 40,
            emotion: "skeptical" as const,
            queryData:["Quality","Features","Support"]
        }
        
    ];

    return (
    <div className=" mx-auto ">
        {sections.map((section, index) => (
            <ObjectionSection
                key={index}
                {...section}
                index={index}
            />
        ))}
    </div>
    )}