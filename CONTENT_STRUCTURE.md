# Portfolio Content Structure

This site treats the root numbered folders as content units.

```txt
00/ = CV module
01/ = Project child module
02/ = Project child module
03/ = Project child module
04/ = Project child module
05/ = Project child module
```

## CV

```txt
00/
├── meta.json
├── content.zh.json
├── content.en.json
├── CV.txt
└── media/
```

## Project

```txt
01/
├── meta.json
├── content.zh.json
├── content.en.json
└── media/
```

Project pages are generated from `meta.json` and the localized `content.*.json` file. The page code should not contain project copy.

## Supported Module Types

```txt
intro
text
image
imageRow
imageGrid
diagram
video
quote
table
reflection
```
