<script>
import ChatBubble from "@/components/ChatBubble.vue";
import db from "../apis/db";

export default {
  components: {
    ChatBubble,
  },

  data() {
    return {
      messages: [],
      fullName: "",
      name: "",
      inputUsername: "",
      inputMessage: "",
    };
  },

  methods: {
    sendMessage() {
      const messagesRef = db.database().ref("messages");
      if (this.inputMessage === "" || this.inputMessage === null) return;

      const message = {
        username: this.name,
        content: this.inputMessage,
      };

      messagesRef.push(message);
      this.inputMessage = "";
    },
  },

  mounted() {
    const messagesRef = db.database().ref("messages");
    messagesRef.on("value", (snapshot) => {
      const msgData = snapshot.val();
      const messages = [];

      Object.keys(msgData).forEach((key) => {
        messages.push({
          id: key,
          username: msgData[key].username,
          content: msgData[key].content,
        });
      });

      this.messages = messages;
      this.name = localStorage.getItem("name");
      this.fullName = localStorage.getItem("fullName");
    });
  },
};
</script>

<template>
  <div
    class="container flex flex-col justify-between flex-1 w-3/4 h-screen mx-auto p:2 sm:p-6 cont-chat"
  >
    <div
      class="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center"
    >
      <h2 class="text-3xl text-center">Book Club</h2>
      <!-- <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
      </div> -->
    </div>

    <!-- chat bubble -->
    <div
      id="messages"
      class="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2"
    >
      <ChatBubble
        v-for="message in this.messages"
        :name="name"
        :key="message.key"
        :message="message"
        :dbMsg="this.messages"
      />
    </div>
    <!-- chat bubble end -->

    <!-- message input -->
    <form
      @submit.prevent="sendMessage"
      class="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0"
    >
      <div class="relative flex">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Write your message!"
          class="w-full py-3 pl-12 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400"
        />

        <div class="absolute inset-y-0 right-0 items-center hidden sm:flex">
          <button
            type="submit"
            class="inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none"
          >
            <span class="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-6 h-6 ml-2 transform rotate-90"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>

  <RouterView />
</template>

<style>
.cont-chat {
  height: 30vh;
}
</style>
