import { CrawlSchema } from './CrawlSchema';
import { GetSchema } from './GetSchema';

type Props = {
  closedEndpoints: string[];
  openEndpoints: string[];
};

export function CrawlResults({ closedEndpoints, openEndpoints }: Props) {
  return (
    <div>
      {closedEndpoints.map((endpoint) => (
        <CrawlSchema endpoint={endpoint} />
      ))}
      {openEndpoints.map((endpoint) => (
        <GetSchema endpoint={endpoint} />
      ))}
    </div>
  );
}
