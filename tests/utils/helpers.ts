export function extractWord(text: string): string {
    const match = text.match(/\d+\s(\w+)/);
    return match ? match[1].toLowerCase() : '';
}