class ListIterator {
    #seq;
    #type;
    #currPos;
    constructor(seq, type) {
        this.#seq = seq;  // can be either a List or a Sequence, traversal uses Positions
        this.#type = type;  // type 1 is an element iterator otherwise its a position iterator
        this.#currPos = null;
        this.reset();
    }
    hasNext() {
        return this.#currPos != null;
    }
    nextObject() {
        let prevPos = this.#currPos;
        if (this.#seq.isLast(this.#currPos)) { // is there another position in list
            this.#currPos = null;
        } else {
            this.#currPos = this.#seq.after(this.#currPos);
            if (this.#currPos == null) {
                throw new Error("The current Position has been deleted from the List");
            }
        }
        if (this.#type == 1) {
            return prevPos.element(); // element iterator
        } else {
            return prevPos;  // position iterator
        }
    }
    reset() {
        if (this.#seq.size() > 0) {
            this.#currPos = this.#seq.first();
        } else {
            this.#currPos = null;
        }
    }
}

exports.ListIterator = ListIterator;
