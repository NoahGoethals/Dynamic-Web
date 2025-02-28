const formatTweet = tekst => tekst.length > 280 ? tekst.slice(0, 277) + "..." : tekst;
const formatPost = tekst => tekst.length > 500 ? tekst.slice(0, 497) + "..." : tekst;
const formatCombo = tekst => `${formatTweet(tekst)}\n\n${formatPost(tekst)}`;

const formatText = () => {
    const inputText = document.getElementById("inputText").value;
    
    document.getElementById("tweetOutput").textContent = `Tweet: ${formatTweet(inputText)}`;
    document.getElementById("postOutput").textContent = `Post: ${formatPost(inputText)}`;
    document.getElementById("comboOutput").textContent = `Gecombineerd:\n${formatCombo(inputText)}`;
};
