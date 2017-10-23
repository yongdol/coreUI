import React, {Component} from 'react';
import RenderTable from "./RenderTable";
import pivot from 'array-pivot'


class TableContent extends Component {
    render() {
        const { obj, grid, i } = this.props;
        const tab = obj.data;
        const type = obj.input_type;
        const layout_append = obj.layout_column_append;
        if (type === 'horizontal') {
            return (
                <RenderTable
                    title={obj.title}
                    tab={tab}
                    key={i}
                    job_id={this.props.job_id}
                    layout_append={layout_append}
                    grid={grid}
                    outline={obj.outline}
                >
                </RenderTable>
            )

        } else {
            const pivotData = pivot(tab);
            return (
                <RenderTable
                    title={obj.title}
                    tab={pivotData}
                    key={i}
                    job_id={this.props.job_id}
                    grid={grid}
                    outline={obj.outline}
                >
                </RenderTable>
            )
        }
    }
}


export default TableContent;
