import { CrawlResults } from './CrawlResults';

type Props = {
  closedEndpoints: string[];
  openEndpoints: string[];
};

export function Endpoints({ closedEndpoints, openEndpoints }: Props) {
  return (
    <>
      <section>
        <h2>Discovered Endpoints</h2>
        <CrawlResults
          closedEndpoints={closedEndpoints}
          openEndpoints={openEndpoints}
        />
      </section>
    </>
  );
}
