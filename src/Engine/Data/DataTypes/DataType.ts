interface DataDataType {
    DataType: object
}

const DataType = {
    new: function() {
        return {
            DataType: DataType
        } as DataDataType
    }
}

export {DataDataType, DataType}