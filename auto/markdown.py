import os
import sys
import shutil
from modules.file import executeConditionalPath, createFile


arguments = list(sys.argv)
elementType = arguments[1]
folderPath = f"../markdown-lab"
file = open(f"{folderPath}/{elementType}.txt", "r", encoding="utf-8")
contents = file.read().split('---')
file.close()

# shutil.rmtree("../markdown-lab/poemas")

executeConditionalPath(
    f"{folderPath}/{elementType}",
    os.makedirs
)

def getTitle(content):
    return (
        content
            .strip()
            .split('\n')[0]
            .lower()
            .split('.')[0]
            .split(',')[0]
            .split(';')[0]
            .split(':')[0]
            .strip()
            .replace(' ', '-')
    )

def getSlug(title):
    return (
        title
            .replace('á', 'a')
            .replace('é', 'e')
            .replace('í', 'i')
            .replace('ó', 'o')
            .replace('ú', 'u')
            .replace('ñ', 'nn')
            .replace('¡', '')
            .replace('¿', '')
            .replace('?', '')
            .replace('!', '')
    )

def getPoem(content):
    return (
        content
            .strip()
            .replace('\n', '\n\n')
            .replace('\n\n\n', '\n\n&nbsp;\n')
    )

for index, content in enumerate(contents):
    title = getTitle(content)
    slug = getSlug(title)
    poem = getPoem(content)
    executeConditionalPath(
        f"{folderPath}/{elementType}/{slug}.md",
        lambda path: createFile(
            path,
            '---\n' +
            f'slug: "/{elementType}/' + slug + '"\n' +
            f'tags: ["' + poem.split('<')[1].strip() + '"]\n' +
            f'title: "{title}"\n' +
            '---\n' +
            poem.split('<')[0].strip()
        )
    )
