import { getPlayCommentService } from "@/service/play/play";
import { defineStore } from "pinia";
import type { IHotcomment } from "@/interface";
const playSongCommentStore = defineStore("comment", {
  state: () => ({
    hotComments: <IHotcomment[]>{},
  }),
  actions: {
    async getPlayCommentAction(id: number) {
      const { hotComments } = await getPlayCommentService(id);
      this.hotComments = hotComments;
    },
  },
});
export default playSongCommentStore();
