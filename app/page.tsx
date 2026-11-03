import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/TextLink";

// TODO(content): replaced by the home page in build step 3.
export default function HomePage() {
  return (
    <main id="main" data-tone="carbon" className="section-pad min-h-svh bg-surface">
      <Container>
        <Heading level={1}>Loyalist Exploration Limited</Heading>
        <p className="text-lead mt-5">The home page is built in step 3. The design system is ready for review.</p>
        <div className="mt-8">
          <TextLink href="/styleguide">Open the styleguide</TextLink>
        </div>
      </Container>
    </main>
  );
}
