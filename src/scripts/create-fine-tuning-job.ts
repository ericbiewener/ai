import { openai } from "../open-ai/client";

const main = async () => {
  const rsp = await openai.client.fineTuning.jobs.create({
    training_file: "file-xIxFDTkfrVpgqzW4D477nDmB",
    validation_file: "file-9lVv3uMfaBdm0kqHWceWwRSl",
    model: "gpt-3.5-turbo",
    suffix: "recipe-ner",
  });

  console.log("Job ID:", rsp.id);
  console.log("Status:", rsp.status);
};

main();
