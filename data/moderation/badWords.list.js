// Lista heurística de palabras ofensivas/vulgares (español LatAm/SV + inglés básico).
// No es exhaustiva: es un filtro de primera línea, no reemplaza la moderación humana.
module.exports = [
    // Español
    'puta', 'puto', 'putas', 'putos', 'hijueputa', 'hijoeputa', 'hijodeputa',
    'mierda', 'pendejo', 'pendeja', 'pendejos', 'pendejas',
    'verga', 'vergas', 'culero', 'culera', 'culeros', 'culeras',
    'cabron', 'cabrona', 'cabrones', 'cabronas',
    'marica', 'maricon', 'mariconazo', 'joto', 'jotos',
    'chingada', 'chingado', 'chingar', 'chingas',
    'pinche', 'pinches', 'perra', 'perras', 'zorra', 'zorras',
    'imbecil', 'imbeciles', 'idiota', 'idiotas',
    'estupido', 'estupida', 'estupidos', 'estupidas',
    'malparido', 'malparida', 'gonorrea', 'malnacido', 'malnacida',
    'desgraciado', 'desgraciada', 'cerote', 'cerotes',
    'hp', 'ptm', 'ctm',

    // Inglés
    'fuck', 'fucking', 'fucker', 'shit', 'bitch', 'asshole',
    'bastard', 'whore', 'slut', 'dumbass', 'moron'
];
