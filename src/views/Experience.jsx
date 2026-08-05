import { experience } from '../data/experience'
import { profile } from '../data/profile'

export default function Experience() {
  return (
    <div className="flex flex-col w-full gap-margin-desktop py-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-gutter">
        <div className="flex flex-col gap-base max-w-2xl">
          <div className="flex items-center gap-base mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#E63946]"></span>
            <span className="font-mono text-[12px] uppercase tracking-widest text-primary">
              Deployment Log
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-display-lg font-extrabold text-on-surface tracking-[-0.02em] relative">
            Field <span className="text-primary">Experience</span>
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-transparent rounded-full opacity-50"></div>
          </h1>
          <p className="font-body text-lg text-on-surface-variant mt-4">
            A running record of production deployments across healthcare, FMCG, credit and retail —
            from data analytics and dashboards to full-stack development.
          </p>
        </div>
        <div className="shrink-0">
          <span className="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant">
            Status:
          </span>{' '}
          <span className="font-mono text-[13px] font-bold text-primary">
            {experience.length} deployments logged
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <section className="lg:col-span-8">
          <div className="relative border-l-2 border-outline-variant/50 pl-8 space-y-12">
            {experience.map((job) => (
              <article
                key={job.role + job.company}
                className="relative group"
              >
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-surface-white group-hover:bg-primary transition-colors duration-300 shadow-[0_0_10px_rgba(230,57,70,0.4)]"></span>
                <div className="bg-surface-white rounded-xl p-6 border border-outline-variant/50 hover:border-primary/40 transition-all duration-300 tech-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h2 className="font-display text-headline-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {job.role}
                    </h2>
                    <span className="font-mono text-[12px] text-primary">{job.years}</span>
                  </div>
                  <p className="font-mono text-[13px] text-on-surface-variant mb-4">
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 font-body text-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">
                          chevron_right
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 flex flex-col gap-gutter">
          <section className="bg-surface-container-lowest rounded-xl p-6 tech-shadow border border-outline-variant/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">school</span>
              </div>
              <h2 className="font-display text-headline-md font-semibold text-on-surface">Education</h2>
            </div>
            <p className="font-display text-[18px] font-semibold text-on-surface leading-snug">
              {profile.education.degree}
            </p>
            <p className="font-mono text-[13px] text-primary mt-1">{profile.education.grade}</p>
            <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-1">
              <p className="font-body text-body-md text-on-surface">{profile.education.school}</p>
              <p className="font-mono text-[12px] text-on-surface-variant">
                {profile.education.place}
              </p>
              <p className="font-mono text-[12px] text-on-surface-variant">{profile.education.years}</p>
            </div>
            {profile.certifications.map((cert) => (
              <div
                key={cert.name}
                className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <div>
                  <p className="font-body text-body-md text-on-surface">{cert.name}</p>
                  <p className="font-mono text-[12px] text-primary">{cert.issuer} · {cert.years}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-surface-container-lowest rounded-xl p-6 tech-shadow border border-outline-variant/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[64px] text-primary">school</span>
            </div>
            <h2 className="font-display text-headline-md font-semibold text-on-surface mb-4">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Data Engineering',
                'ETL / ELT',
                'Airflow',
                'Data Warehousing',
                'Power BI / DAX',
                'Machine Learning',
                'SQL',
                'Python',
                'PostgreSQL',
                'MySQL',
                'Oracle',
                'AWS',
                'Azure Data Factory',
                'Linux',
                'Laravel',
                'JavaScript',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-[12px]"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/30">
              <p className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider mb-2">
                Languages
              </p>
              <p className="font-body text-body-md text-on-surface">
                Fluent in English &amp; Kiswahili
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
