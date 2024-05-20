from wagtail import blocks


class DefaultHeroSectionBlock(blocks.StructBlock):
    top_cta_action = blocks.CharBlock()
    top_cta_text = blocks.CharBlock()
    top_cta_link = blocks.PageChooserBlock()
    heading = blocks.CharBlock()
    body = blocks.CharBlock()
    btn_1_text = blocks.CharBlock()
    btn_1_page = blocks.PageChooserBlock()
    btn_2_text = blocks.CharBlock()
    btn_2_link = blocks.URLBlock()

    class Meta:
        icon = 'image'
        template = 'blocks/DefaultHeroSection.html'


class ListItemBlock(blocks.StructBlock):
    item_text = blocks.CharBlock()


class ParagraphBlock(blocks.StructBlock):
    text = blocks.CharBlock()


class CtaSectionWithChecklistBlock(blocks.StructBlock):
    heading = blocks.CharBlock()
    body = blocks.ListBlock(child_block=ParagraphBlock())
    list_items = blocks.ListBlock(child_block=ListItemBlock())
    btn_1_text = blocks.CharBlock()
    btn_1_page = blocks.PageChooserBlock()

    class Meta:
        icon = 'checklist'
        template = 'blocks/CtaSectionWithChecklistBlock.html'
