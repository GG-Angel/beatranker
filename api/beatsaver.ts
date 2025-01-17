import axios from "axios"

const api = "https://api.beatsaver.com"

export const downloadMap = async (mapId: string): Promise<void> => {
  try {
    const url = `${api}/maps/id/${mapId}`
    const resp = await axios.get(url);
    const data = resp.data;
    const versions = data.versions
    const downloadUrl = versions[versions.length - 1].downloadURL

    const link = document.createElement("a");
    link.href = downloadUrl;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Could not download map", error)
  }
}