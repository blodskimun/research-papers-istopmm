# iStopMM project

This private project uses the reusable research-papers core. `core-papers.json`
is the agreed list of 60 core titles and DOIs. It contains no PDFs, extracted
text or evidence snapshots. Being listed does not mean a paper is available or
extracted.

After `make setup`, start the local web app:

```sh
make web WEB_PORT=8082
```

Use port 8082 to avoid the general-purpose project's app on 8081. Open
<http://127.0.0.1:8082/settings>, name the project iStopMM, record your actual
authorization basis, and select `core-papers.json`. Attach each authorized PDF
through Project settings after checking its identity. The resulting local
project is ignored by Git. This is a new extraction; initializing from the
manifest does not import historical text. Stop this app with
`make web-off WEB_PORT=8082`.

## Preserved evidence

The separately maintained preservation copy contains the previous papers,
extracts and immutable releases, with a SHA-256 inventory. It is local to the
same machine and is not an independent disaster backup. Do not copy its
credentials, PDFs, extracts, checksum inventory or history into this repository.

Do not point this project's normal `make web` command at the preservation copy.
It enables project-writing workflows and expects this project's own registry.
Inspect historical evidence using a separately configured legacy reader, not
project initialization or automatic update actions against the backup.

The preserved registry remains separate from the new `core` project. Search
both and compare source DOI, SHA-256, page locator and text to review a new
extraction; differing source hashes may represent different PDF versions.
Do not edit old snapshots or run the old source-update workflow from the copy:
its historical configuration contains path-bound run identities. Migration
into the new core model has not yet been implemented.

`origin` is `blodskimun/research-papers-istopmm`, a GitHub fork of the reusable
software core at `bjornlevi/research-papers`; `upstream` points to that core.
Merge upstream software updates while preserving this project's manifest.
Never push preserved research data or credentials.
