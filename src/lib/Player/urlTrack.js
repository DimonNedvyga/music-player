export default function createUrl(file) {
    if (file) {
        let url = URL.createObjectURL(file);
        return url;
    };
};