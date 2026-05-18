export interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  collocations: string[];
  level: 'band6' | 'band7' | 'band8' | 'band9';
  category: string;
}

export const vocabularyData: Record<string, Word[]> = {
  academic: [
    { id: 1, word: 'phenomenon', phonetic: '/fɪˈnɒmɪnən/', meaning: '现象', partOfSpeech: 'noun', example: 'The phenomenon of urbanization has accelerated in recent decades.', exampleTranslation: '城市化的现象在过去几十年加速发展。', collocations: ['social phenomenon', 'natural phenomenon'], level: 'band7', category: '学术词汇' },
    { id: 2, word: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', meaning: '全面的', partOfSpeech: 'adjective', example: 'The government should conduct a comprehensive review.', exampleTranslation: '政府应该进行全面审查。', collocations: ['comprehensive analysis'], level: 'band7', category: '学术词汇' },
    { id: 3, word: 'substantial', phonetic: '/səbˈstænʃəl/', meaning: '大量的', partOfSpeech: 'adjective', example: 'There has been a substantial increase in students.', exampleTranslation: '学生数量有了大幅增长。', collocations: ['substantial evidence'], level: 'band7', category: '学术词汇' },
    { id: 4, word: 'hypothesis', phonetic: '/haɪˈpɒθɪsɪs/', meaning: '假设', partOfSpeech: 'noun', example: 'The researcher tested the hypothesis.', exampleTranslation: '研究人员检验了这个假设。', collocations: ['test a hypothesis'], level: 'band8', category: '学术词汇' },
    { id: 5, word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: '范式', partOfSpeech: 'noun', example: 'This is a new paradigm in research.', exampleTranslation: '这是研究的新范式。', collocations: ['paradigm shift'], level: 'band9', category: '学术词汇' },
  ],
  environment: [
    { id: 6, word: 'sustainable', phonetic: '/səˈsteɪnəbl/', meaning: '可持续的', partOfSpeech: 'adjective', example: 'Sustainable development is crucial.', exampleTranslation: '可持续发展至关重要。', collocations: ['sustainable development'], level: 'band7', category: '环境词汇' },
    { id: 7, word: 'emission', phonetic: '/ɪˈmɪʃən/', meaning: '排放', partOfSpeech: 'noun', example: 'Carbon emissions have decreased.', exampleTranslation: '碳排放已经减少。', collocations: ['carbon emission'], level: 'band7', category: '环境词汇' },
    { id: 8, word: 'biodiversity', phonetic: '/ˌbaɪəʊdaɪˈvɜːsɪti/', meaning: '生物多样性', partOfSpeech: 'noun', example: 'Biodiversity loss poses a serious threat.', exampleTranslation: '生物多样性丧失构成严重威胁。', collocations: ['biodiversity loss'], level: 'band8', category: '环境词汇' },
    { id: 9, word: 'exacerbate', phonetic: '/ɪɡˈzæsəbeɪt/', meaning: '使恶化', partOfSpeech: 'verb', example: 'Climate change exacerbates natural disasters.', exampleTranslation: '气候变化加剧自然灾害。', collocations: ['exacerbate problems'], level: 'band9', category: '环境词汇' },
  ],
  technology: [
    { id: 10, word: 'artificial intelligence', phonetic: '/ˌɑːtɪfɪʃəl ɪnˈtelɪdʒəns/', meaning: '人工智能', partOfSpeech: 'noun', example: 'AI has revolutionized many industries.', exampleTranslation: '人工智能彻底改变了许多行业。', collocations: ['AI development'], level: 'band7', category: '科技词汇' },
    { id: 11, word: 'automate', phonetic: '/ˈɔːtəmeɪt/', meaning: '自动化', partOfSpeech: 'verb', example: 'Many processes have been automated.', exampleTranslation: '许多过程已经自动化。', collocations: ['automate production'], level: 'band8', category: '科技词汇' },
    { id: 12, word: 'encryption', phonetic: '/ɪnˈkrɪpʃən/', meaning: '加密', partOfSpeech: 'noun', example: 'Data encryption is essential.', exampleTranslation: '数据加密至关重要。', collocations: ['data encryption'], level: 'band9', category: '科技词汇' },
  ],
  education: [
    { id: 13, word: 'curriculum', phonetic: '/kəˈrɪkjələm/', meaning: '课程', partOfSpeech: 'noun', example: 'The school curriculum should be updated.', exampleTranslation: '学校课程应该更新。', collocations: ['school curriculum'], level: 'band7', category: '教育词汇' },
    { id: 14, word: 'pedagogy', phonetic: '/ˈpedəɡɒdʒi/', meaning: '教学法', partOfSpeech: 'noun', example: 'Modern pedagogy emphasizes interactive learning.', exampleTranslation: '现代教学法强调互动学习。', collocations: ['modern pedagogy'], level: 'band9', category: '教育词汇' },
    { id: 15, word: 'enrollment', phonetic: '/ɪnˈrəʊlmənt/', meaning: '入学', partOfSpeech: 'noun', example: 'University enrollment has increased.', exampleTranslation: '大学入学率提高了。', collocations: ['university enrollment'], level: 'band8', category: '教育词汇' },
  ],
  society: [
    { id: 16, word: 'urbanization', phonetic: '/ˌɜːbənaɪˈzeɪʃən/', meaning: '城市化', partOfSpeech: 'noun', example: 'Rapid urbanization leads to challenges.', exampleTranslation: '快速城市化导致挑战。', collocations: ['rapid urbanization'], level: 'band8', category: '社会词汇' },
    { id: 17, word: 'inequality', phonetic: '/ˌɪnɪˈkwɒləti/', meaning: '不平等', partOfSpeech: 'noun', example: 'Economic inequality remains a major issue.', exampleTranslation: '经济不平等是一个主要问题。', collocations: ['economic inequality'], level: 'band7', category: '社会词汇' },
    { id: 18, word: 'disparity', phonetic: '/dɪˈspærɪti/', meaning: '差异', partOfSpeech: 'noun', example: 'There is a significant disparity.', exampleTranslation: '存在显著差异。', collocations: ['wealth disparity'], level: 'band9', category: '社会词汇' },
  ],
  health: [
    { id: 19, word: 'epidemic', phonetic: '/ˌepɪˈdemɪk/', meaning: '疫情', partOfSpeech: 'noun', example: 'The epidemic has impacted health systems.', exampleTranslation: '疫情影响了卫生系统。', collocations: ['global epidemic'], level: 'band7', category: '健康词汇' },
    { id: 20, word: 'sedentary', phonetic: '/ˈsedəntəri/', meaning: '久坐的', partOfSpeech: 'adjective', example: 'A sedentary lifestyle causes health problems.', exampleTranslation: '久坐的生活方式导致健康问题。', collocations: ['sedentary lifestyle'], level: 'band8', category: '健康词汇' },
    { id: 21, word: 'obesity', phonetic: '/əʊˈbiːsɪti/', meaning: '肥胖', partOfSpeech: 'noun', example: 'Childhood obesity is a growing concern.', exampleTranslation: '儿童肥胖是日益关注的问题。', collocations: ['childhood obesity'], level: 'band8', category: '健康词汇' },
    { id: 22, word: 'wellbeing', phonetic: '/ˌwelˈbiːɪŋ/', meaning: '福祉', partOfSpeech: 'noun', example: 'Employee wellbeing is important.', exampleTranslation: '员工福祉很重要。', collocations: ['mental wellbeing'], level: 'band7', category: '健康词汇' },
  ]
};

export const levelLabels: Record<string, string> = { band6: 'Band 6', band7: 'Band 7', band8: 'Band 8', band9: 'Band 9' };
export const levelColors: Record<string, string> = { band6: 'bg-blue-100 text-blue-800', band7: 'bg-green-100 text-green-800', band8: 'bg-yellow-100 text-yellow-800', band9: 'bg-purple-100 text-purple-800' };