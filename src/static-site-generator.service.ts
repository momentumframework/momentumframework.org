import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import { copy, ensureDir, walk } from "https://deno.land/std/fs/mod.ts";
import { Injectable } from "./deps.ts";

@Injectable({ global: false })
export class StaticSiteGeneratorService {
  async compilePages() {
    const pages = await this.getPages();
    await Promise.all(pages.map((p) => this.compilePage(p)));
  }

  async copyContent() {
    await ensureDir("./dist/content");
    await copy("./src/content", "./dist/content", { overwrite: true });
  }

  private async getPages() {
    const pagePaths: string[] = [];
    for await (const entry of walk("./src/pages")) {
      if (entry.isFile) {
        pagePaths.push(`./${entry.path.replaceAll("\\", "/")}`);
      }
    }
    return pagePaths;
  }

  private async compilePage(relativeSrcFilePath: string) {
    const parsedMarkdown = this.compileMarkdown(relativeSrcFilePath);
    const templatedHtml = this.applyTemplating(
      parsedMarkdown.meta.title,
      parsedMarkdown.content,
      parsedMarkdown.meta.layout ?? "main",
    );
    const relativeDistFilePah = relativeSrcFilePath.replace(
      "src/pages/",
      "dist/",
    ).replace(".md", ".html");
    await this.writeFile(relativeDistFilePah, templatedHtml);
  }

  private compileMarkdown(relativeSrcFilePath: string) {
    const markdown = this.readFile(relativeSrcFilePath);
    return Marked.parse(markdown);
  }

  /**
   * "I want Handlebars!"
   * "We have Handlebars at home."
   * Handlebars at home:
   */
  private applyTemplating(title: string, body: string, layoutFile: string) {
    return this.getLayout(layoutFile)
      .replaceAll("{{{ title }}}", title)
      .replaceAll("{{{ renderBody }}}", body);
  }

  private getLayout(layoutFile: string) {
    return this.readFile(`src/_layout/${layoutFile}.html`);
  }

  private readFile(relativeSrcFilePath: string) {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(Deno.readFileSync(relativeSrcFilePath));
  }

  private async writeFile(relativeDistFilePath: string, data: string) {
    const distPathParts = relativeDistFilePath.split("/");
    distPathParts.pop();
    const distDirPath = distPathParts.join("/");
    await ensureDir(distDirPath);
    Deno.writeTextFileSync(relativeDistFilePath, data);
  }
}
