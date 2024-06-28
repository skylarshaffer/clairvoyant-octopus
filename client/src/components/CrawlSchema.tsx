import { useState } from 'react';

type Props = {
  endpoint: string;
};

export function CrawlSchema({ endpoint }: Props) {
  const [results, setResults] = useState([] as string[]);
  const es = new EventSource(`/api/clairvoyance/${endpoint}`);
  let endpointResults = ['Loading...'];
  setResults(endpointResults);
  es.onmessage = (e) => {
    const eData: string = e.data.toString();
    const eDataMessage = eData;
    if (results.includes('Loading...')) {
      endpointResults = [eDataMessage];
    } else {
      endpointResults = [...results, eDataMessage];
    }
    setResults(results);
  };
  es.onerror = () => {
    console.log('closing eventSource');
    es.close();
  };
  es.addEventListener('close', () => {
    return;
  });

  return (
    <section>
      <div>
        {results.map((result) => (
          <p>{result}</p>
        ))}
      </div>
    </section>
  );
}
