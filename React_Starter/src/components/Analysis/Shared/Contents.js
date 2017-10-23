import React, {Component} from 'react';
import MarkdownContent from "./MarkdownContent";
import GraphContent from "./GraphContent";
import TableContent from "./TableContent";

class Contents extends Component {
    render() {
        const { obj, scheme, ind, job_id } = this.props;
        const gridNum = 12/scheme[ind].length;
        switch (obj.form) {
            case "markdown" :
                return (
                    <MarkdownContent
                        obj={obj}
                        grid={gridNum}
                        i={ind}
                    />
                );

            case "graph" :
                return (
                    <GraphContent
                        obj={obj}
                        grid={gridNum}
                        i={ind}
                    />
                );

            case "table" :
                return (
                    <TableContent
                        obj={obj}
                        grid={gridNum}
                        i={ind}
                        job_id={job_id}
                    />
                );
            default :
                return (
                    <div>
                        Error!
                    </div>
                )
        }
    }
}


export default Contents;
