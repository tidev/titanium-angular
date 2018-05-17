export function camelize(value: string): string {
    return value.replace(/-(\w)/g, (match, firstSubMatch) => firstSubMatch ? firstSubMatch.toUpperCase() : '');
}

export function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}