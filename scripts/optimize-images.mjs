// scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'

const INPUT_DIR = 'public/assets'
const OUTPUT_DIR = 'public/assets'

async function optimize(filePath) {
  const name = basename(filePath, extname(filePath))
  const inputSize = (await import('fs/promises')).stat(filePath).then((s) => s.size)
  console.log(`\n📸 Otimizando: ${name}`)

  const original = await inputSize
  console.log(`   Original: ${(original / 1024 / 1024).toFixed(2)} MB`)

  // WebP quality 80
  const webpPath = join(OUTPUT_DIR, `${name}.webp`)
  await sharp(filePath).webp({ quality: 80, effort: 6 }).toFile(webpPath)
  const webpSize = (await (await import('fs/promises')).stat(webpPath)).size
  console.log(`   WebP: ${(webpSize / 1024).toFixed(0)} KB (${((1 - webpSize / original) * 100).toFixed(0)}% menor)`)

  // AVIF quality 60
  const avifPath = join(OUTPUT_DIR, `${name}.avif`)
  await sharp(filePath).avif({ quality: 60, effort: 6 }).toFile(avifPath)
  const avifSize = (await (await import('fs/promises')).stat(avifPath)).size
  console.log(`   AVIF: ${(avifSize / 1024).toFixed(0)} KB (${((1 - avifSize / original) * 100).toFixed(0)}% menor)`)
}

async function main() {
  const files = (await readdir(INPUT_DIR)).filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
  await mkdir(OUTPUT_DIR, { recursive: true })

  for (const file of files) {
    await optimize(join(INPUT_DIR, file))
  }

  console.log('\n✅ Conversão concluída!')
}

main().catch(console.error)