import type { ContentFile, ContentModule } from "@/types/content";

function findBody(modules: ContentModule[], title: string) {
  const module = modules.find((item) => "title" in item && item.title === title && "body" in item);
  return module && "body" in module ? module.body : "";
}

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitDate(value: string) {
  const match = value.match(/^(.*?)(\s*\d{4}\.\d+\s*-\s*)$/);
  return match ? { label: match[1].trim(), date: match[2].trim() } : { label: value, date: "" };
}

function splitAwardDate(value: string) {
  const match = value.match(/^(.*?)(\s+\d{4})$/);
  return match ? { label: match[1].trim(), date: match[2].trim() } : { label: value, date: "" };
}

export function CvLayout({ content }: { content: ContentFile }) {
  const imageModule = content.modules.find((module) => module.type === "image" && "src" in module);
  const introModule = content.modules.find((module) => module.type === "intro" && "body" in module);
  const introLines = introModule && "body" in introModule ? lines(introModule.body) : [];

  const name = introLines[0] || "";
  const email = introLines[introLines.length - 1] || "";
  const isEnglish = content.modules.some((module) => "title" in module && module.title === "Education");
  const location = isEnglish ? "Guangdong Guangzhou" : "广东 广州";
  const education = lines(findBody(content.modules, "教育") || findBody(content.modules, "Education"));
  const awards = lines(findBody(content.modules, "奖项") || findBody(content.modules, "Awards"));
  const experience = lines(findBody(content.modules, "经历") || findBody(content.modules, "Experience"));
  const tools = lines(findBody(content.modules, "工具") || findBody(content.modules, "Tools"));
  const fields = lines(findBody(content.modules, "方向") || findBody(content.modules, "Fields"));

  return (
    <section className="cvLayout">
      <div className="cvColumn cvColumnFields">
        <div className="cvFields">
          {fields.map((field) => (
            <p key={field}>{field}</p>
          ))}
        </div>
      </div>

      <div className="cvColumn cvColumnTools">
        <div className="cvTools">
          {tools.map((tool) => (
            <p key={tool}>{tool}</p>
          ))}
        </div>
      </div>

      <div className="cvColumn cvColumnProfile">
        <div className="cvIntro">
          {imageModule && "src" in imageModule ? <img className="cvPhoto" src={imageModule.src} alt={name} /> : null}
          <h1 className="cvName">{name}</h1>
          <p className="cvLocation">{location}</p>
          <p className="cvEmail">{email}</p>
          <p className="cvEducation">{education.join("\n")}</p>
        </div>

        <div className="cvLower">
          {experience.length ? (
            <div className="cvExperience">
              {experience.map((item) => {
                const entry = splitDate(item);
                return (
                  <p className="cvExperienceItem" key={item}>
                    <span>{entry.label}</span>
                    <span>{entry.date}</span>
                  </p>
                );
              })}
            </div>
          ) : null}

          <div className="cvAwards">
            {awards.map((award) => {
              const entry = splitAwardDate(award);
              return (
                <p className="cvAward" key={award}>
                  <span className="cvAwardLabel">{entry.label}</span>
                  {entry.date ? <span className="cvAwardDate">{entry.date}</span> : null}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
