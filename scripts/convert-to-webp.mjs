import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.jfif'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
      continue
    }

    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    if (IMAGE_EXT.has(ext)) {
      files.push(fullPath)
    }
  }

  return files
}

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const outputPath = filePath.slice(0, -ext.length) + '.webp'
  const info = await stat(filePath)

  await sharp(filePath)
    .webp({
      quality: ext === '.png' ? 88 : 82,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(outputPath)

  const outInfo = await stat(outputPath)
  const saved = ((1 - outInfo.size / info.size) * 100).toFixed(1)

  return { filePath, outputPath, before: info.size, after: outInfo.size, saved }
}

const targets = [
  path.join(ROOT, 'src', 'assets'),
  path.join(ROOT, 'public'),
]

const files = (await Promise.all(targets.map((dir) => walk(dir)))).flat()
const results = []

for (const file of files) {
  results.push(await convertFile(file))
}

console.log(`Converted ${results.length} images to WebP`)
for (const row of results) {
  console.log(
    `${path.relative(ROOT, row.outputPath)} (${Math.round(row.before / 1024)}KB -> ${Math.round(row.after / 1024)}KB, -${row.saved}%)`,
  )
}
