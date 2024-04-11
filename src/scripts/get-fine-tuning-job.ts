import { openai } from "../open-ai/client";

const main = async () => {
  const rsp = await openai.client.fineTuning.jobs.retrieve(
    "ftjob-FGeMvlv5kKdHdThcLli9q2CE",
  );

  console.log(rsp);
};

main();
