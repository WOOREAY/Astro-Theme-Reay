/**
 * Remark Plugin: Calculate Reading Time
 * Automatically calculates and adds reading time to post frontmatter
 */
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

/**
 * Remark plugin to calculate reading time for markdown content
 * @returns Remark transformer function
 */
export function remarkReadingTime() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage, {
      wordsPerMinute: 200 // Approx. 200 Chinese characters per minute
    })
    
    // Add reading time to frontmatter
    data.astro.frontmatter.readingTime = readingTime.text
    data.astro.frontmatter.readingMinutes = Math.ceil(readingTime.minutes)
  }
}
