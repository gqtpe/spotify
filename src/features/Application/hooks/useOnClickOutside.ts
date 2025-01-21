
        //listener function checks if it clicked inside anchor it return, else call callback function
        const listener = (e: Event) => {
            const el = anchor.current
            if (!el || el.contains((e?.target as Node) || null)) {
                return
            }
            callback(e)
        }