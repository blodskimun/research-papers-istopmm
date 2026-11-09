# iStopMM project

This private project uses the reusable research-papers core. `core-papers.json`
is the agreed list of 60 core titles and DOIs. It contains no PDFs, extracted
text or evidence snapshots. Being listed does not mean a paper is available or
extracted.

After `make setup`, initialize a new local project:

```sh
.venv/bin/research-project init --name "iStopMM" \
  --authorization "Authorized for private extraction and retrieval." \
  --manifest core-papers.json
.venv/bin/research-project status
```

Attach each authorized PDF using `research-project attach-pdf` after checking
its identity. The resulting local project is ignored by Git. This is a new
extraction; initializing from the manifest does not import historical text.

## Preserved evidence

The separately maintained preservation copy contains the previous papers,
extracts and immutable releases, with a SHA-256 inventory. It is local to the
same machine and is not an independent disaster backup. Do not copy its
credentials, PDFs, extracts, checksum inventory or history into this repository.

To inspect the preserved snapshots without changing them, select the legacy
registry and collections when starting the reader, for example:

```sh
make web COLLECTION_REGISTRY=/absolute/path/to/preservation-copy/releases/m9-platform \
  COLLECTIONS="istopmm literature catalog" DEFAULT_COLLECTIONS="istopmm literature"
```

The preserved registry remains separate from the new `core` project. Search
both and compare source DOI, SHA-256, page locator and text to review a new
extraction; differing source hashes may represent different PDF versions.
Do not edit old snapshots or run the old source-update workflow from the copy:
its historical configuration contains path-bound run identities. Migration
into the new core model has not yet been implemented.

`origin` is this private project; `upstream` points to the public software core.
This is an independent private repository, not a GitHub fork of the public
repository.
