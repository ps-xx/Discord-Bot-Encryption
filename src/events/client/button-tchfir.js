const { 
    Events, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags
} = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId === 'tchfir_btn') {
                const modal = new ModalBuilder()
                    .setCustomId('tchfir_modal')
                    .setTitle('شفر منشورك');

                const postInput = new TextInputBuilder()
                    .setCustomId('post_content')
                    .setLabel("حط منشورك في اسفل خانة") 
                    .setPlaceholder("...مثال: بيع خدمات برمجية Demon Network™ جداً") 
                    .setStyle(TextInputStyle.Paragraph) 
                    .setRequired(true) 
                    .setMinLength(5)  
                    .setMaxLength(2000); 

                modal.addComponents(new ActionRowBuilder().addComponents(postInput));
                await interaction.showModal(modal);
            }

            if (interaction.customId === 'send_dm_btn') {
                const encryptedText = interaction.message.content.split('```')[1]?.trim();
                try {
                    await interaction.user.send(`${encryptedText}`);
                    await interaction.reply({ content: "✅ تم إرسال النص إلى خاصك بنجاح.", flags: [MessageFlags.Ephemeral] });
                } catch (error) {
                    await interaction.reply({ content: "❌ عذراً، لا يمكنني إرسال رسالة إليك. تأكد من فتح إعدادات الرسائل الخاصة (DM) في هذا السيرفر.", flags: [MessageFlags.Ephemeral] });
                }
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'tchfir_modal') {
                let text = interaction.fields.getTextInputValue('post_content');

                const wordsMap = {
                    "سعر": "سـ3ـر", "دفع": "دفـ3", "شوب": "شـ&ـب", "شراء": "شـrـاء", "بيع": "بيـ3", "متوفر": "متـ9فر",
                    "نيترو": "نيـtرو", "متجر": "متـjر", "ثمن": "ثـmـن", "اسعار": "اسـ3ـار", "سوق": "سـ&ـق", "أسعار": "أسـ3ـار",
                    "مشتري": "مشتـrـي", "يشتري": "يشتـrـي", "بائع": "بائـ3", "حساب": "7ـساب", "حسابي": "7ـسابي", "حسابات": "7ـسابات",
                    "اكونت": "اكونـt", "ديسكورد": "ديسكوrد", "العاب": "الـ3ـاب", "لعبة": "لـ3ـبة", "اونلاين": "ا9نلاين", "أونلاين": "أ9نلاين"
                };

                const needsEncryption = Object.keys(wordsMap).some(word => text.includes(word));

                if (!needsEncryption) {
                 
                    return await interaction.reply({
                        content: `⚠️ **هذا المنشور مشفر بالفعل أو لا يحتوي على كلمات تحتاج لتشفير:**\n\`\`\`\n${text}\n\`\`\``,
                        flags: [MessageFlags.Ephemeral]

                    });
                }

                for (const [key, value] of Object.entries(wordsMap)) {
                    text = text.replace(new RegExp(key, 'g'), value);
                }

                const dmButton = new ButtonBuilder()
                    .setCustomId('send_dm_btn')
                    .setLabel('DM')
                    .setStyle(ButtonStyle.Secondary);

                const row = new ActionRowBuilder().addComponents(dmButton);

                await interaction.reply({
                    content: `**تم تشفير منشورك بنجاح:**\n\`\`\`\n${text}\n\`\`\``,
                    components: [row],
                    flags: [MessageFlags.Ephemeral]
                });
            }
        }
    }
};