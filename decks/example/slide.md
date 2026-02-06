---
marp: true
theme: lab
class: normal
paginate: true
transition: slide
style: |
  section {
    --logos-dark: url(shared/logos/marp-logo.svg);
    --logos-light: url(shared/logos/marp-logo.svg);
  }
---

<!-- _paginate: skip -->
<!-- _class: title -->
<!-- _header: 2026-02-02 -->

# Marp Slide Guide

<div class="info">

Lab Slide Template

</div>

---

<!-- _header: Slide Classes -->

## Basic Classes

- `.title` - Title slide with centered heading
- `.invert` - Dark mode (inverts colors)
- `.col` - Two-column layout
- `.fit` - Fit content to slide

```markdown
<!-- _class: title -->       # Title slide
<!-- _class: invert -->      # Dark mode
<!-- _class: title invert --> # Title slide with dark mode
```

---

<!-- _header: Text Emphasis -->

## Emphasis Styles

- _Italic with underline_ - `*text*` or `_text_`
- **Bold with color** - `**text**` or `__text__`
- ==Highlighted text== - `==text==`

### Usage

```markdown
This is _emphasized_ text with underline.
This is **strong** text with yellow color.
This is ==marked== text with background.
```

---

<!-- _header: Lists -->

## Unordered List

- Item 1
  - Nested item 1.1
  - Nested item 1.2
- Item 2
- Item 3

## Ordered List

1. First item
   1. Nested 1.1
   2. Nested 1.2
2. Second item
3. Third item

---

<!-- _header: Text Sizes -->

## Text Size Classes

<div class="col">
<div>

<span class="text-xl5">text-xl5 (3em)</span>
<span class="text-xl4">text-xl4 (2.25em)</span>
<span class="text-xl3">text-xl3 (1.875em)</span>
<span class="text-xl2">text-xl2 (1.5em)</span>
<span class="text-xl">text-xl (1.25em)</span>

</div>
<div>

<span class="text-lg">text-lg (1.125em)</span>
<span>default (1em)</span>
<span class="text-sm">text-sm (0.875em)</span>
<span class="text-xs">text-xs (0.75em)</span>
<span class="text-xs2">text-xs2 (0.625em)</span>
<span class="text-xs3">text-xs3 (0.5em)</span>

</div>
</div>

---

<!-- _header: Colors -->

## Text Color Classes

<span class="white bg-gray-800 px-2">white</span>
<span class="black">black</span>
<span class="gray">gray</span>
<span class="red">red</span>
<span class="orange">orange</span>
<span class="yellow">yellow</span>
<span class="green">green</span>
<span class="cyan">cyan</span>
<span class="blue">blue</span>
<span class="purple">purple</span>
<span class="pink">pink</span>

### Usage

```markdown
<span class="red">Red text</span>
<span class="blue">Blue text</span>
```

---

<!-- _header: Two-Column Layout -->

## Column Layout

<div class="col">
<div>

### Left Column

Content for the left side.

- Point 1
- Point 2

</div>
<div>

### Right Column

Content for the right side.

1. Step 1
2. Step 2

</div>
</div>

```html
<div class="col">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

---

<!-- _header: Callout Boxes -->

## Callout Styles

<div class="note">

**Note**: General information or tips.

</div>

<div class="tip">

**Tip**: Helpful suggestions.

</div>

<div class="warning">

**Warning**: Important caution.

</div>

<div class="caution">

**Caution**: Potential issues.

</div>

<div class="important">

**Important**: Critical information.

</div>

---

<!-- _header: Figures -->

## Figure Width Classes

<div class="col">
<div>

```html
<figure class="w-full">
  <img src="..." />
  <figcaption>Full width</figcaption>
</figure>
```

Available classes:

- `.w-full` - 100%
- `.w-3/4` - 75%
- `.w-1/2` - 50%
- `.w-1/3` - 33%
- `.w-1/4` - 25%

</div>
<div>

<figure class="w-3/4">
<img src="shared/img/fig.png" />
<figcaption>w-3/4 example</figcaption>
</figure>

</div>
</div>

---

<!-- _header: Color Schemes -->

## Available Color Schemes

| Class             | Description                           |
| :---------------- | :------------------------------------ |
| `.neogaia`        | Gaia-inspired theme (dark by default) |
| `.neogaia.invert` | Neogaia light mode                    |
| `.dracula`        | Purple accent, dark background        |
| `.one-dark`       | Blue accent, dark background          |
| `.nord`           | Cyan accent, dark background          |
| `.github-light`   | Blue accent, light background         |

```markdown
---
class: neogaia
---

<!-- For light mode -->

class: neogaia invert
```

Dark themes (neogaia, dracula, one-dark, nord) automatically use inverted logos.

---

<!-- _class: dracula -->
<!-- _header: Dracula Theme -->

## Dracula Color Scheme

This slide uses the **Dracula** color scheme.

- Dark purple background
- Light text
- Purple accent color

```markdown
<!-- _class: dracula -->
```

---

<!-- _class: one-dark -->
<!-- _header: One Dark Theme -->

## One Dark Color Scheme

This slide uses the **One Dark** color scheme.

- Dark gray background
- Muted text colors
- Blue accent color

```markdown
<!-- _class: one-dark -->
```

---

<!-- _class: nord -->
<!-- _header: Nord Theme -->

## Nord Color Scheme

This slide uses the **Nord** color scheme.

- Arctic blue background
- Light text
- Cyan accent color

```markdown
<!-- _class: nord -->
```

---

<!-- _class: github-light -->
<!-- _header: GitHub Light Theme -->

## GitHub Light Color Scheme

This slide uses the **GitHub Light** color scheme.

- White background
- Dark text
- Blue accent color

```markdown
<!-- _class: github-light -->
```

---

<!-- _class: neogaia -->
<!-- _header: Neogaia Theme (Dark) -->

## Neogaia Color Scheme

This slide uses the **Neogaia** color scheme (dark mode by default).

- Dark blue-gray background
- Warm white text
- _Yellow emphasis_ and **strong text**

```markdown
<!-- _class: neogaia -->
```

---

<!-- _class: neogaia invert -->
<!-- _header: Neogaia Theme (Light) -->

## Neogaia Light Mode

This slide uses the **Neogaia** color scheme with `.invert` (light mode).

- Warm white background
- Dark text
- _Darker emphasis_ for visibility

```markdown
<!-- _class: neogaia invert -->
```

---

<!-- _header: Info Block -->

## Info Block for Title Slides

Use `.info` class for author/affiliation info:

```html
<div class="info">Affiliation: Department Name: Author Name</div>
```

This creates right-aligned text suitable for title slides.

---

<!-- _paginate: skip -->
<!-- _class: title invert -->
<!-- _header: 2026-02-02 -->

# Thank You

<div class="info">

Questions?

</div>
