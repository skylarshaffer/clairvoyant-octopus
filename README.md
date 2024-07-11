# graph-test

http://ec2-13-57-0-146.us-west-1.compute.amazonaws.com/

An ugly but functional full-stack HTML/TS/CSS and Express/Node chaining of Goctopus and Clairvoyance that allows website owners to test their domain for common GraphQL vulnerabilities without installing anything.

## Description

Testing a domain for GraphQL vulnerabilities has never been easier! Don't worry about installing multiple package managers, dependencies, and copying and pasting results, let graph-test do it for you!

## Usage

Just enter your root domain (example.com) in the input field and submit. Watch graph-test work its magic. As Goctopus discovers endpoints, they will show up below.

Each endpoint with schema introspection on will output the schema. Endpoints that are closed or leaking will be passed to Clairvoyance for further testing.

Clairvoyance tests for any field suggestion or autocomplete vulnerabilities, and if it can piece togethere a schema, it will output it.

## Version History

* 1.0
    * Initial Release

## Roadmap

- [x] Publish

- [ ] Design front-end

- [ ] Developer support: Return to submodule-forward approach, reduce manual labor (package manager dependencies) in deploying and add more documentation

- [ ] Add CORS functionality to fix strict endpoint blocking

- [ ] Reduce schema to downloadable file instead of text dump

- [ ] Summarize actions instead of raw output, opt-in output viewing

- [ ] Chain my own third tool for Schema deduction (in development)

- [ ] Migrate to serverless

## Tools

### [escape](https://github.com/Escape-Technologies)

- [goctopus](https://github.com/Escape-Technologies/goctopus)
  
### [Nikita Stupin](https://github.com/nikitastupin)

- [Clairvoyance](https://github.com/nikitastupin/clairvoyance)

## Acknowledgments

* Made using LearningFuze's repository template and VSCode environment. Actively uses latest versions of goctopus and Clairvoyance on the backend.
