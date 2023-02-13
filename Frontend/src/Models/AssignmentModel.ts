class AssignmentModel {
    public assignmentId: string;
    public date: Date;
    public description: string;
    public imageFile: FileList = null;
    public imageName: string;
    public isDone?: boolean;
}

export default AssignmentModel;