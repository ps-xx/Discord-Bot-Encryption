const { SlashCommandBuilder, ContainerBuilder, MediaGalleryBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { UrlImage, ColoreEmbd, } = require("../../../config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("إرسال لوحة التشفير"),

    async execute(interaction, client) {
        // 1. بناء الجاليري للصورة (العرض الكامل)
        const bannerGallery = new MediaGalleryBuilder().addItems(
            (item) =>
                item
                    .setDescription('التشفير')
                    .setURL(UrlImage), // ضع رابط صورة "التشفير" هنا
        );

        // 2. بناء الحاوية بنفس ترتيب الصورة المرفقة
        const mainContainer = new ContainerBuilder()
            .setAccentColor(ColoreEmbd) // اللون الأخضر الخاص بنايلا
            
            .addTextDisplayComponents((text) =>
                text.setContent("**Demon Network™ Blade Your Post • شفر منشورك**"),
            )

            // النص الفرعي (الوصف)
            .addTextDisplayComponents((text) =>
                
                text.setContent("عزيزي البائع، لتشفير منشورك اضغط على الزر في الأسفل"),
            )
            
            // الصورة (Media Gallery)
            .addMediaGalleryComponents(bannerGallery)
            .addSeparatorComponents((separator) => separator)

            .addSectionComponents((section) =>
                section
                    .addTextDisplayComponents((text) => 
                        text.setContent("عزيزي البائع، لتشفير منشورك اضغط على الزر")
                    )
                    .setButtonAccessory((btn) =>
                        btn.setCustomId('tchfir_btn')
                           .setLabel('تشفير المنشور')
                           .setStyle(ButtonStyle.Success)
                    ),
            );

        // 3. إرسال الرسالة مع تفعيل التنسيق الجديد
        await interaction.channel.send({
        components: [mainContainer],
        flags: [MessageFlags.IsComponentsV2]
        });
    },
};