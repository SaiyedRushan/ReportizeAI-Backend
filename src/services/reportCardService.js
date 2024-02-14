import OpenAI from "openai";
const openai = new OpenAI();

export const generateStrengthsNextSteps = async (studentInformation) => {
  const strengths = studentInformation.strengths;
  const nextSteps = studentInformation.nextSteps;
  const grade = studentInformation.studentInfo.grade;
  const absent = studentInformation.studentInfo.absent;
  const late = studentInformation.studentInfo.late;
  const responsibility = studentInformation.studentInfo.responsibility;
  const organized = studentInformation.studentInfo.organized;
  const independent = studentInformation.studentInfo.independent;
  const collaboration = studentInformation.studentInfo.collaboration;
  const initiative = studentInformation.studentInfo.initiative;

  const prompt = `
  You are a teacher. Generate some comments about the students strengths and next steps. The student is in grade ${grade}. He is absent ${absent} days. He is late ${late} times. He is excellent in ${responsibility}. He is good in ${organized}. He is satisfactory in ${independent}. He needs improvement in ${collaboration}. He is excellent in taking ${initiative}.
  He needs improvement in the following things - ${nextSteps}. His strengths are - ${strengths}.`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 250,
  });

  return completion.choices[0]?.message?.content;
};
