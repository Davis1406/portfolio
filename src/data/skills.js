export const radarAxes = ['Frontend', 'Data Science', 'Databases', 'Mobile', 'DevOps', 'Architecture']

export const radarValues = [80, 94, 92, 68, 78, 82]

export const competence = 88

export const skillBars = [
  { label: 'Data Engineering & ETL', value: 93 },
  { label: 'Data Analysis & SQL', value: 92 },
  { label: 'BI & Data Modelling', value: 88 },
  { label: 'Software Engineering', value: 82 },
]

export const activeStack = [
  { initials: 'Py', color: '#3776AB', name: 'Python / pandas / scikit-learn', level: 'EXPERT' },
  { initials: 'SQ', color: '#4479A1', name: 'SQL (PostgreSQL, MySQL, SQL Server, Oracle)', level: 'EXPERT' },
  { initials: 'PW', color: '#F2C811', name: 'Power BI & DAX', level: 'EXPERT' },
  { initials: 'AF', color: '#017CEE', name: 'Apache Airflow', level: 'ADVANCED' },
  { initials: 'AW', color: '#FF9900', name: 'AWS (EC2, S3)', level: 'ADVANCED' },
  { initials: 'La', color: '#FF2D20', name: 'Laravel / PHP', level: 'ADVANCED' },
]

export const terminalLines = [
  { type: 'comment', text: '# Initializing environment...' },
  { type: 'primary', text: 'Loading modules [||||||||||] 100%' },
  { type: 'spacer' },
  { type: 'cmd', text: 'user@system:~$ whoami' },
  { type: 'plain', text: 'Davis Hyacinth | Lead Data Engineer' },
  { type: 'spacer' },
  { type: 'cmd', text: 'user@system:~$ cat stack.json' },
  {
    type: 'json',
    text: JSON.stringify(
      {
        languages: ['Python', 'SQL', 'Java', 'JavaScript', 'Go', 'R', 'DAX', 'M'],
        data_engineering: ['ETL/ELT', 'Airflow', 'Data Warehousing', 'pandas', 'scikit-learn'],
        cloud: ['AWS (EC2, S3)', 'Azure Data Factory', 'Azure Synapse'],
        bi: ['Power BI', 'Data Modelling'],
        databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle'],
        infrastructure: ['Linux', 'Apache', 'AWS Servers'],
      },
      null,
      2
    ),
  },
]
