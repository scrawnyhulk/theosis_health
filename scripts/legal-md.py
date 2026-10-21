"""Tiny markdown -> HTML for the legal drafts (headings, lists, quotes, tables, bold/italic/links)."""
import html, re, sys, pathlib
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![*\w])\*(?!\s)(.+?)\*(?!\w)', r'<em>\1</em>', t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    return t
def conv(md):
    out, lst, para, tbl = [], None, [], []
    def flush():
        nonlocal lst, para, tbl
        if para: out.append('<p>' + inline(' '.join(para)) + '</p>'); para = []
        if lst: out.append(f'</{lst}>'); lst = None
        if tbl:
            rows = [r for r in tbl if not re.match(r'^\|[\s:|-]+\|$', r)]
            h = ''.join(f'<th>{inline(c.strip())}</th>' for c in rows[0].strip('|').split('|'))
            b = ''.join('<tr>' + ''.join(f'<td>{inline(c.strip())}</td>' for c in r.strip('|').split('|')) + '</tr>' for r in rows[1:])
            out.append(f'<table><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table>'); tbl = []
    for line in md.splitlines():
        s = line.rstrip()
        if s.startswith('|'): 
            if para or lst: flush()
            tbl.append(s); continue
        elif tbl: flush()
        m = re.match(r'^(#{1,4})\s+(.*)', s)
        if m:
            flush(); n = len(m.group(1)); txt = m.group(2)
            aid = re.search(r'\{#([\w-]+)\}', txt); txt = re.sub(r'\s*\{#[\w-]+\}', '', txt)
            slug = aid.group(1) if aid else re.sub(r'[^a-z0-9]+', '-', txt.lower()).strip('-')
            out.append(f'<h{n} id="{slug}">{inline(txt)}</h{n}>'); continue
        m = re.match(r'^\s*([-*]|\d+\.)\s+(.*)', s)
        if m:
            kind = 'ol' if m.group(1)[0].isdigit() else 'ul'
            if para: flush()
            if lst != kind:
                if lst: out.append(f'</{lst}>')
                out.append(f'<{kind}>'); lst = kind
            out.append('<li>' + inline(m.group(2)) + '</li>'); continue
        if s.startswith('>'):
            flush(); out.append('<blockquote>' + inline(s.lstrip('> ')) + '</blockquote>'); continue
        if s.strip() in ('---', '***'): flush(); out.append('<hr>'); continue
        if not s.strip(): flush(); continue
        if lst: flush()
        para.append(s.strip())
    flush(); return '\n'.join(out)
src, dst = sys.argv[1], sys.argv[2]
for n in ('terms', 'privacy', 'disclaimer'):
    md = pathlib.Path(src, n + '.md').read_text()
    pathlib.Path(dst, n + '.html').write_text(conv(md))
