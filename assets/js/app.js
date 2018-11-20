$(document).ready(function () {
    function Dialogue(isYou, text, emote, responses, wait = 2) {
        this.isYou = isYou;
        this.text = text;
        this.emote = emote;
        this.wait = wait;
        this.responses = responses;
    }

    Dialogue.prototype.blockText = function () {
        return $('<li>').html(this.text);
    }

    const allDialogue = [];
    allDialogue.push(
        /* 0 */ new Dialogue(false, "I know that can’t have been easy for you.", 'sad', [1, 2, 3]),
        /* 1 */ new Dialogue(true, "Easy!? It was hell!", 'angry', [4]),
        /* 2 */ new Dialogue(true, "I survived.", 'normal', [5]),
        /* 3 */ new Dialogue(true, "...", 'normal', [4]),
        /* 4 */ new Dialogue(false, "I thought-<br/>I thought you'd get away.<br/>'" +
            "If'd known you'd be imprisoned...", 'normal', [6, 7]),
        /* 5 */ new Dialogue(false, "I'm glad.", 'normal', []),
        /* 6 */ new Dialogue(true, "I'm not upset about doing time, Arjana.", 'normal', []),
        /* 7 */ new Dialogue(true, "Maybe think a little harder next time.", 'normal', []),
    );

    Dialogue.prototype.showResponses = function() {
        let $choiceDiv = $('<div>');
        for(let i = 0; i < this.responses.length; i++) {
            let index = this.responses[i];
            $choiceDiv.append(
                allDialogue[index].blockText().attr('data-index', index)
            );
        }
        return $choiceDiv;
    }
    
    let currentDialogue = allDialogue[0];
    $('#choices').html(currentDialogue.showResponses().html());

    
});