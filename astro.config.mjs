// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from '@unocss/astro';

// Markdown 配置（集中管理）
import { markdownConfig } from './src/data/markdown.config.ts';

// https://astro.build/config
export default defineConfig({
    integrations: [
        UnoCSS({
            injectReset: true,
        })
    ],
    site: process.env.SITE || 'https://localhost:4321',
    base: process.env.BASE || '/',
    
    // 使用集中管理的 Markdown 配置
    markdown: markdownConfig,
});
