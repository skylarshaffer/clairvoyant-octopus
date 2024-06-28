import { CrawlSchema } from './CrawlSchema';

type Props = {
  endpoints: string[];
};

export function CrawlResults({ endpoints }: Props) {
  return (
    <section>
      <div>
        {endpoints.map((endpoint) => (
          <CrawlSchema endpoint={endpoint} />
        ))}
      </div>
    </section>
  );
}
