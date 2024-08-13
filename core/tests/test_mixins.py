from unittest import TestCase

from core.mixins import SlugModelMixin

class TestModel(SlugModelMixin):
    slug_attr = "name"

class TestModelNoAttr(SlugModelMixin):
    pass

class SlugModelMixinTests(TestCase):
    def setUp(self):
        self.slug_model = TestModel()

    def test_slug_model_mixin_has_slug_attribute(self):
        self.assertTrue(hasattr(self.slug_model, 'slug'))

    def test_missing_slug_attr_raises_exception(self):
        with self.assertRaises(NotImplementedError):
            TestModelNoAttr()
